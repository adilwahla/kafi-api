const InjuryCaseService = require('../../services/injuryCases.service');
const { InjuryCase } = require('../../models'); // Ensure this is the correct path to your model
//Handles: Create (bulk), Assign, Get (with filters), Submit (patch)
exports.createInjuryCases = async (req, res) => {
  try {
    const result = await InjuryCaseService.bulkCreateInjuries(req.body);
    res.status(201).json({
      success: true,
      data: result,
      message: 'Injury cases created successfully'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: { message: error.message, code: 'CREATE_FAILED' }
    });
  }
};

exports.assignInjuries = async (req, res) => {
  try {
    await InjuryCaseService.assignInjuries(req.body.Assign);
    res.json({ success: true, message: 'Injury assignments updated' });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: { message: error.message, code: 'ASSIGN_FAILED' }
    });
  }
};

exports.getInjuryCases = async (req, res) => {
  try {
    const data = await InjuryCaseService.getInjuriesWithFilters(req.query);
    res.json({ success: true, data, message: 'Fetched successfully' });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: { message: error.message, code: 'FETCH_FAILED' }
    });
  }
};

exports.submitInjury = async (req, res) => {
  try {
    const userId = req.user.id; // assuming JWT gives req.user
    await InjuryCaseService.submitInjury(req.params.id, userId);
    res.json({ success: true, message: 'Injury submitted' });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: { message: error.message, code: 'SUBMIT_FAILED' }
    });
  }
};



// Add more handlers as needed for other operations like update, delete, etc.

exports.approveInjury = async (req, res) => {
  try {
    await InjuryCase.update(
      {
        isApproved: true,
        approvedAt: new Date().toISOString(),
        approvedBy: req.user.id
      },
      { where: { id: req.params.id } }
    );
    res.json({ success: true, message: 'Injury approved' });
  } catch (error) {
    res.status(400).json({ success: false, error: { message: error.message, code: 'APPROVE_FAILED' } });
  }
};

exports.rejectInjury = async (req, res) => {
  try {
    await InjuryCase.update(
      {
        isRejected: true,
        rejectedAt: new Date().toISOString(),
        rejectedBy: req.user.id
      },
      { where: { id: req.params.id } }
    );
    res.json({ success: true, message: 'Injury rejected' });
  } catch (error) {
    res.status(400).json({ success: false, error: { message: error.message, code: 'REJECT_FAILED' } });
  }
};

exports.closeInjury = async (req, res) => {
  try {
    await InjuryCase.update(
      { isClosed: true },
      { where: { id: req.params.id } }
    );
    res.json({ success: true, message: 'Injury closed' });
  } catch (error) {
    res.status(400).json({ success: false, error: { message: error.message, code: 'CLOSE_FAILED' } });
  }
};

exports.softDeleteInjury = async (req, res) => {
  try {
    await InjuryCase.update(
      { isDeleted: true },
      { where: { id: req.params.id } }
    );
    res.json({ success: true, message: 'Injury soft-deleted' });
  } catch (error) {
    res.status(400).json({ success: false, error: { message: error.message, code: 'DELETE_FAILED' } });
  }
};



