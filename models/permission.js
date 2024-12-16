module.exports = (sequelize, DataTypes) => {
  const permission = sequelize.define('permission', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
    slug: { type: DataTypes.STRING, allowNull: false },
  });

  permission.associate = (models) => {
    // Many-to-Many relationship with Role through RolePermission
    permission.belongsToMany(models.role, {
      through: models.role_permission, // Using the join table 'role_permission'
      foreignKey: 'permissionId', // Foreign key on the 'role_permission' table
      otherKey: 'roleId', // The other key that connects to the 'role' table
      as: 'roles', // Alias for the related 'role' model
    });
  };

  return permission;
};
