module.exports = (sequelize, DataTypes) => {
  const role = sequelize.define('role', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
    slug: { type: DataTypes.STRING, allowNull: false, unique: true }, // E.g., "Mid-Level Developer"
  });

  role.associate = (models) => {
    // Many-to-Many relationship with User through User_role
    role.belongsToMany(models.User, { through: models.user_role, foreignKey: 'roleId' });

    // Many-to-Many relationship with Permission through rolePermissions
    role.belongsToMany(models.Permission, { through: models.role_permission, foreignKey: 'roleId' });
  };

  return role;
};
