// File: seeders/20250719110000-seed-years-with-weeks-days.js
'use strict';
const moment = require('moment-hijri');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const yearsToSeed = [2024, 2025 ,2026];
    const now = new Date().toISOString().slice(0, 19).replace('T', ' ');

    for (const year of yearsToSeed) {
      const [existingYear] = await queryInterface.sequelize.query(
        `SELECT id FROM years WHERE year = ${year}`
      );

      if (existingYear.length > 0) {
        console.log(`Year ${year} already exists. Skipping.`);
        continue;
      }

      const hijriStart = moment(`${year}-01-01`).locale('en').format('iYYYY');
      const hijriEnd = moment(`${year}-12-31`).locale('en').format('iYYYY');

      await queryInterface.bulkInsert('years', [{
        year,
        hijri_year_range: `${hijriStart}-${hijriEnd}`,
        created_at: now,
        updated_at: now
      }]);

      const yearResult = await queryInterface.sequelize.query(
        `SELECT id FROM years WHERE year = ${year}`
      );
      const yearId = yearResult[0][0].id;
//   <-----paste code logic here for weeeks and days seeding----->
      console.log(`Year ${year} seeded with ID ${yearId}.`);
 let currentDate = moment(`${year}-01-01`).startOf('week');
for (let weekNumber = 1; weekNumber <= 52; weekNumber++) {
  await queryInterface.bulkInsert('epidemic_weeks', [{
    week_number: weekNumber,
    year_id: yearId,
    created_at: now,
    updated_at: now
  }]);

  const weekResult = await queryInterface.sequelize.query(
    `SELECT id FROM epidemic_weeks WHERE year_id = ${yearId} AND week_number = ${weekNumber}`
  );
  const weekId = weekResult[0][0].id;

  const days = [];
  for (let i = 0; i < 7; i++) {
    const day = currentDate.clone().add(i, 'days');
    days.push({
      week_id: weekId,
      day_name: day.locale('en').format('dddd'),
      date: day.locale('en').format('YYYY-MM-DD')
    });
  }

  await queryInterface.bulkInsert('epidemic_days', days);
  currentDate.add(7, 'days');
}
//   <-----paste code upto here for weeeks and days seeding----->
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('epidemic_days', null, {});
    await queryInterface.bulkDelete('epidemic_weeks', null, {});
    await queryInterface.bulkDelete('years', {
      year: [2024, 2025, 2026]
    });
  }
};
