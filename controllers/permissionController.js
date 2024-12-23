const {permission, role, role_permission} = require('../models')


const getPermissions = async (req, res) => {
    try {
    const permissions = await permission.findAll({
       
    });

      res.status(200).json({ success: true, permissions });
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
};


const assignPermissionsToRole = async (req, res) => {
    try {
      const { roleId, permissions } = req.body;
  
      // Basic validation
      if (!roleId || !permissions || !Array.isArray(permissions)) {
        return res.status(400).json({
          message: 'Role ID and permissions are required, and permissions must be an array.',
        });
      }
  
      // Check if the role exists
      const roleInstance = await role.findByPk(roleId);
      if (!roleInstance) {
        return res.status(404).json({ message: 'Role not found' });
      }
  
      // Check if the permissions exist
      const permissionsInstances = await permission.findAll({
        where: {
          id: permissions,
        },
      });
  
      if (permissionsInstances.length !== permissions.length) {
        return res.status(404).json({ message: 'Some permissions not found' });
      }
  
      // Clear existing role permissions for the role
      await role_permission.destroy({
        where: { roleId },
      });
  
      // Create new role-permission associations
      const newRolePermissions = permissionsInstances.map(permissionInstance => ({
        roleId,
        permissionId: permissionInstance.id,
      }));
  
      // Insert the new associations into the role_permission table
      await role_permission.bulkCreate(newRolePermissions);
  
      return res.status(201).json({
        message: 'Permissions successfully assigned to the role',
        role: {
          id: roleInstance.id,
          name: roleInstance.name,
          slug: roleInstance.slug,
        },
        permissions: newRolePermissions,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: 'An error occurred while assigning permissions to the role.',
      });
    }
  };

module.exports = {getPermissions, assignPermissionsToRole};