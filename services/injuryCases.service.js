const { InjuryCase } = require('../models');
const { Op } = require('sequelize');

// Bulk create, with duplicate investigationCode detection
exports.bulkCreateInjuries = async (list) => {
  if (!Array.isArray(list) || list.length === 0)
    throw new Error('List must be a non-empty array');

  // Collect all investigationCodes in the batch
  const codes = list.map(item => item.investigationCode);
  if (new Set(codes).size !== codes.length)
    throw new Error('Duplicate investigationCode in request');

  // Check for existing codes in DB
  const existing = await InjuryCase.findAll({ where: { investigationCode: { [Op.in]: codes } } });
  if (existing.length)
    throw new Error('Some investigationCodes already exist: ' + existing.map(e => e.investigationCode).join(', '));

  // Insert all
  return await InjuryCase.bulkCreate(list);
};

exports.assignInjuries = async (assignList) => {
  // assignList: [{injury: id, user: id}]
  for (const assign of assignList) {
    await InjuryCase.update(
      { assignedTo: assign.user },
      { where: { id: assign.injury } }
    );
  }
};

exports.getInjuriesWithFilters = async (query) => {
  const where = {};
  if (query.date) where.weekDate = query.date;
  if (query.approved === 'true') where.isApproved = true;
  if (query.closed === 'true') where.isClosed = true;
  if (query.incoming === 'true') where.isSubmitted = false;
  if (query.under_processing === 'true') where.isSubmitted = true; // plus more conditions as needed

  // add pagination if needed
  const limit = parseInt(query.limit) || 20;
  const page = parseInt(query.page) || 1;

  return await InjuryCase.findAll({ where, limit, offset: (page - 1) * limit });
};

exports.submitInjury = async (injuryId, userId) => {
  await InjuryCase.update(
  {
      submittedBy: userId, // you can add this column if needed
      submittedAt: new Date().toISOString(), // fix: convert Date to string
      isSubmitted: true
    },
    { where: { id: injuryId } }
  );
};
