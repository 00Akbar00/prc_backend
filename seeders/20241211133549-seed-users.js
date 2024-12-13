'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Insert some example user
    await queryInterface.bulkInsert('user', [
      {
        name: 'Akbar',
        email: 'akbar@example.com',
        password: 'password',  // Ideally, hash the password before saving
        departmentId: 1,  // Assuming department ID 1 exists
        roleId: 1,  // Super user
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: 'password123',  // Ideally, hash the password before saving
        departmentId: 2,  // Assuming department ID 2 exists
        roleId: 3,  // Regular user
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Jane Smith',
        email: 'janesmith@example.com',
        password: 'password123',  // Ideally, hash the password before saving
        departmentId: 3,  // Assuming department ID 3 exists
        roleId: 3,  // Regular user
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Alice Johnson',
        email: 'alicejohnson@example.com',
        password: 'password123',  // Ideally, hash the password before saving
        departmentId: 4,  // Assuming department ID 4 exists
        roleId: 3,  // Regular user
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    // Delete the user if seeding is rolled back
    await queryInterface.bulkDelete('user', null, {});
  },
};
