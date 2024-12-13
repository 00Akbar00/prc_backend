module.exports = (sequelize, DataTypes) => {
  const permission = sequelize.define('permission', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
    slug: { type: DataTypes.STRING, allowNull: false },
  });

  permission.associate = (models) => {
    // Many-to-Many relationship with User through User_role
    permission.belongsToMany(models.role, { through: models.role_permission, foreignKey: 'permissionId' });
  };

  return permission;
};
