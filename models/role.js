module.exports = (sequelize, DataTypes) => {
  const role = sequelize.define('role', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
    slug: { type: DataTypes.STRING, allowNull: false, unique: true }, // E.g., "Mid-Level Developer"
  });

  role.associate = (models) => {
    role.belongsToMany(models.user, {
      through: models.user_role,
      foreignKey: 'roleId',
      otherKey: 'userId',
      as: 'users',
    });

    role.belongsToMany(models.permission, {
      through: models.role_permission,
      foreignKey: 'roleId',
      otherKey: 'permissionId',
      as: 'permissions',
    });

    
  };
  

  return role;
};
