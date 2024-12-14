'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('roles', [
      {
        name: 'Admin',
        slug: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'User',
        slug: 'user',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Manager',
        slug: 'manager',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('roles', null, {});
  }
};
