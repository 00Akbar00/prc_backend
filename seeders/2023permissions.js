'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Define permission data
    const permissions = [
      { name: 'Add Role', slug: 'add-role', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Delete Role', slug: 'delete-role', createdAt: new Date(), updatedAt: new Date() },
      { name: 'View Roles', slug: 'view-roles', createdAt: new Date(), updatedAt: new Date() },

      { name: 'Add Department', slug: 'add-department', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Delete Department', slug: 'delete-department', createdAt: new Date(), updatedAt: new Date() },
      { name: 'View Departments', slug: 'view-departments', createdAt: new Date(), updatedAt: new Date() },

      { name: 'Add User', slug: 'add-user', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Delete User', slug: 'delete-user', createdAt: new Date(), updatedAt: new Date() },
      { name: 'View Users', slug: 'view-users', createdAt: new Date(), updatedAt: new Date() },
    ];

    // Insert data into 'permissions' table
    await queryInterface.bulkInsert('permissions', permissions, {});
  },

  down: async (queryInterface, Sequelize) => {
    // Delete data from 'permissions' table
    await queryInterface.bulkDelete('permissions', null, {});
  },
};
