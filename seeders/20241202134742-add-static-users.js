'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Add static data
    return queryInterface.bulkInsert('Users', [
      {
        name: 'John Doe',
        email: 'john@example.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Jane Doe',
        email: 'jane@example.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    // Remove static data
    return queryInterface.bulkDelete('Users', null, {});
  },
};
