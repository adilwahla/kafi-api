'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('epidemic_days', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      week_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'epidemic_weeks', // ✅ MUST match the actual table name
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      day_name: {
        type: Sequelize.STRING
      },
      date: {
        type: Sequelize.DATEONLY
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('epidemic_days');
  }
};
