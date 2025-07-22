// File: migrations/YYYYMMDDHHMMSS-create-mobileusers.js
'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('mobileusers', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
      phone: { type: Sequelize.STRING, unique: true, allowNull: false },
      full_name: Sequelize.STRING,
      gender: Sequelize.ENUM('Male', 'Female'),
      age: Sequelize.INTEGER,
      profession: Sequelize.STRING,
      country: Sequelize.STRING,
      email: Sequelize.STRING,
      password: Sequelize.STRING,
      role: Sequelize.ENUM('EMPLOYEE', 'FIELD_INSPECTOR'),
      fingerprint_login_enabled: { type: Sequelize.BOOLEAN, defaultValue: false },
      notifications_enabled: { type: Sequelize.BOOLEAN, defaultValue: true },
      app_language: { type: Sequelize.STRING, defaultValue: 'en' },
      is_approved: { type: Sequelize.BOOLEAN, defaultValue: false },
      otp_verified_at: Sequelize.DATE,
      created_at: { type: Sequelize.DATE, allowNull: false },
      updated_at: { type: Sequelize.DATE, allowNull: false }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('mobileusers');
  }
};
