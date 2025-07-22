const { Year, EpidemicWeek, EpidemicDay } = require('../models');
const moment = require('moment-hijri');
moment.locale('en');


// Helper to ensure dates have Western numerals only
// function toWesternDigits(str) {
//   return str.replace(/[٠-٩]/g, d => '0123456789'['٠١٢٣٤٥٦٧٨٩'.indexOf(d)]);
// }

exports.createYear = async (year) => {
  const existing = await Year.findOne({ where: { year } });
  if (existing) throw new Error('Year already exists');

  const startDate = moment(`${year}-01-01`);
  const endDate = moment(`${year}-12-31`);
  const toWesternDigits = s => s.replace(/[٠-٩]/g, d => '0123456789'['٠١٢٣٤٥٦٧٨٩'.indexOf(d)]);
  const hijriStart = toWesternDigits(moment(startDate).format('iYYYY'));
  const hijriEnd = toWesternDigits(moment(endDate).format('iYYYY'));

  const createdYear = await Year.create({
    year,
    hijri_year_range: `${hijriStart}-${hijriEnd}`
  });

 // console.log('AFTER YEAR CREATION:', createdYear.id);

  let current = startDate.clone().startOf('week');
  for (let weekNum = 1; weekNum <= 52; weekNum++) {
   // console.log('Creating week', weekNum, 'for year_id', createdYear.id);
    try {
      const week = await EpidemicWeek.create({
        week_number: weekNum,
        year_id: createdYear.id
      });
      console.log('Week created:', week ? week.id : null);

      const days = [];
      for (let i = 0; i < 7; i++) {
        const day = current.clone().add(i, 'days');
        days.push({
          week_id: week.id,
          day_name: day.format('dddd'),
          date: toWesternDigits(day.format('YYYY-MM-DD'))
        });
      }
      await EpidemicDay.bulkCreate(days);
      current.add(7, 'days');
    } catch (err) {
      console.error('Week/day creation failed:', err);
      throw err;
    }
  }

  return createdYear;
};




// exports.createYear = async (year) => {
//   const existing = await Year.findOne({ where: { year } });
//   if (existing) throw new Error('Year already exists');

//   const startDate = moment(`${year}-01-01`);
//   const endDate = moment(`${year}-12-31`);
//   const hijriStart = moment(startDate).format('iYYYY');
//   const hijriEnd = moment(endDate).format('iYYYY');

//   const createdYear = await Year.create({
//     year,
//     hijri_year_range: `${hijriStart}-${hijriEnd}`
//   });

//   let current = startDate.clone().startOf('week'); // Sunday
//   let weekNum = 1;

//   while (current.isBefore(endDate)) {
//     const week = await EpidemicWeek.create({
//       week_number: weekNum++,
//       year_id: createdYear.id
//     });

//     for (let i = 0; i < 7; i++) {
//       const day = current.clone().add(i, 'days');
//       await EpidemicDay.create({
//         week_id: week.id,
//         day_name: day.format('dddd'),
//         date: day.format('YYYY-MM-DD')
//       });
//     }

//     current.add(7, 'days');
//   }

//   return createdYear;
// };



exports.getAllYearsDetailed = async () => {
  const years = await Year.findAll({
    include: [
      {
        model: EpidemicWeek,
        as: 'weeks', // ✅ MUST MATCH model
        include: [
          {
            model: EpidemicDay,
            as: 'days'
          }
        ],
        order: [['week_number', 'ASC']]
      }
    ],
    order: [['year', 'DESC']]
  });

  return years.map(y => ({
    year: y.year,
    hijri_year_range: y.hijri_year_range,
    weeks: y.weeks.map(w => ({
      week_number: w.week_number,
      days: w.days.map(d => ({
        name: d.day_name,
        date: d.date
      }))
    }))
  }));
};

