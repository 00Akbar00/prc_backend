module.exports = (sequelize, DataTypes) => {
  const RolePermission = sequelize.define('RolePermission', {
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Roles', // Make sure your Roles table name is 'Roles'
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    permissionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Permissions', // Make sure your Permissions table name is 'Permissions'
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
  }, {
    timestamps: true, // Automatically manages 'createdAt' and 'updatedAt' fields
    tableName: 'RolePermissions', // Explicitly specify the table name (optional)
  });

  // Define any associations if necessary
  RolePermission.associate = (models) => {
    // Example: RolePermission belongs to Role and Permission
    RolePermission.belongsTo(models.Role, {
      foreignKey: 'roleId',
      as: 'role',
    });

    RolePermission.belongsTo(models.Permission, {
      foreignKey: 'permissionId',
      as: 'permission',
    });
  };

  return RolePermission;
};
