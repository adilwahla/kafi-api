'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Year extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Year.init({
    year: DataTypes.INTEGER,
    hijri_year_range: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Year',
    
  });
  return Year;
};