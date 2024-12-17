'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      // Fetch all permissions
      const permissions = await queryInterface.sequelize.query(
        'SELECT id FROM permissions',
        { type: Sequelize.QueryTypes.SELECT }
      );

      // Map permissions to create role_permission entries for roleId = 1
      const rolePermissions = permissions.map(permission => ({
        roleId: 1,
        permissionId: permission.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      }));

      // Insert into the role_permission table
      await queryInterface.bulkInsert('role_permission', rolePermissions, {});
      console.log('All permissions have been assigned to roleId 1.');
    } catch (error) {
      console.error('Error assigning permissions to roleId 1:', error);
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      // Remove role_permissions for roleId = 1
      await queryInterface.bulkDelete('role_permission', { roleId: 1 }, {});
      console.log('Permissions for roleId 1 have been removed.');
    } catch (error) {
      console.error('Error removing permissions for roleId 1:', error);
    }
  }
};
