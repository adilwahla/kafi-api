const YearService = require('../../services/year.service');

exports.createYear = async (req, res) => {
  try {
    const { year } = req.body;
    const newYear = await YearService.createYear(year);
    res.status(201).json({
      success: true,
      data: newYear,
      message: 'Year created successfully'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: { message: error.message, code: 'CREATE_FAILED' }
    });
  }
};

exports.getAllYears = async (req, res) => {
  try {
    const years = await YearService.getAllYearsDetailed();
    res.json({
      success: true,
      data: years,
      message: 'Fetched successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { message: error.message, code: 'FETCH_FAILED' }
    });
  }
};
