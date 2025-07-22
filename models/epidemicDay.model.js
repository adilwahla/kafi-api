
'use strict';

module.exports = (sequelize, DataTypes) => {
  const EpidemicDay = sequelize.define('EpidemicDay', {
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
    tableName: 'epidemic_days',
    timestamps: false // ✅ disable timestamps to prevent Sequelize from expecting createdAt
  });

  EpidemicDay.associate = (models) => {
    EpidemicDay.belongsTo(models.EpidemicWeek, {
      foreignKey: 'week_id',
      onDelete: 'CASCADE'
    });
  };

  return EpidemicDay;
};


// await queryInterface.createTable('epidemic_days', {
//   id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
//   week_id: {
//     type: Sequelize.INTEGER,
//     references: { model: 'epidemic_weeks', key: 'id' }, // ✅ MUST MATCH EXACT TABLE NAME
//     onDelete: 'CASCADE'
//   },
//   day_name: Sequelize.STRING,
//   date: Sequelize.DATEONLY
// });
