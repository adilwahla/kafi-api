'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const password = await bcrypt.hash('password123', 10);
    const now = new Date().toISOString().replace('T', ' ').substring(0, 19);

    await queryInterface.bulkInsert('mobileusers', [
      {
        phone: '966500000001',
        full_name: 'Ali Employee',
        gender: 'Male',
        age: 30,
        profession: 'Technician',
        country: 'Saudi Arabia',
        email: 'ali.employee@demo.com',
        password: password,
        role: 'EMPLOYEE',
        fingerprint_login_enabled: true,
        notifications_enabled: true,
        app_language: 'en',
        is_approved: true,
        otp_verified_at: now,
        created_at: now,
        updated_at: now
      },
      {
        phone: '966500000002',
        full_name: 'Fatima Inspector',
        gender: 'Female',
        age: 28,
        profession: 'Inspector',
        country: 'Saudi Arabia',
        email: 'fatima.inspector@demo.com',
        password: password,
        role: 'FIELD_INSPECTOR',
        fingerprint_login_enabled: false,
        notifications_enabled: true,
        app_language: 'ar',
        is_approved: false,
        otp_verified_at: null,
        created_at: now,
        updated_at: now
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('mobileusers', null, {});
  }
};
