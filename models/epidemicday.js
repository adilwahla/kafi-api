'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class EpidemicDay extends Model {
    static associate(models) {
      EpidemicDay.belongsTo(models.EpidemicWeek, { foreignKey: 'week_id' });
    }
  }

  EpidemicDay.init({
    week_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    day_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'EpidemicDay',         // ✅ correct key
    tableName: 'epidemic_days',       // ✅ correct table name
    timestamps: false                 // ✅ matches your schema
  });

  return EpidemicDay;
};
