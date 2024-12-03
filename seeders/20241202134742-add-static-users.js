'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Add static data
    return queryInterface.bulkInsert('Users', [
      {
        username: 'Akbar', // Changed from 'name' to 'username'
        email: 'akbar@example.com',
        password: '12345678', // Assuming you want to insert a password
        isAdmin: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'berry', // Changed from 'name' to 'username'
        email: 'berry@example.com',
        password: '123456789',
        isAdmin: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    // Remove static data
    return queryInterface.bulkDelete('Users', null, {});
  },
};
