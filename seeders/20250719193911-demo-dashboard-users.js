'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const password = await bcrypt.hash('12345678', 10);
const now = new Date().toISOString().replace('T', ' ').substring(0, 19);

    await queryInterface.bulkInsert('dashboardusers', [
      {
        full_name: 'Super Admin',
        username: 'super.admin',
        email: 'super.admin@amanah.gov.sa',
        password: password,
        role: 'SUPER_ADMIN',
        is_active: true,
        created_at: now,
        updated_at: now
      },
      {
        full_name: 'Admin One',
        username: 'admin.one',
        email: 'admin.one@amanah.gov.sa',
        password: password,
        role: 'ADMIN',
        is_active: true,
        created_at: now,
        updated_at: now
      },
      {
        full_name: 'Manager One',
        username: 'manager.one',
        email: 'manager.one@amanah.gov.sa',
        password: password,
        role: 'MANAGER',
        is_active: true,
        created_at: now,
        updated_at: now
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('dashboardusers', {
      email: [
        'super.admin@amanah.gov.sa',
        'admin.one@amanah.gov.sa',
        'manager.one@amanah.gov.sa'
      ]
    });
  }
};
