module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
   
  });

  user.associate = (models) => {
    // Many-to-Many relationship with User through User_role
    user.belongsToMany(models.department, { through: models.user_department, foreignKey: 'userId' });

    // Many-to-Many relationship with Permission through rolePermissions
    user.belongsToMany(models.role, { through: models.user_role, foreignKey: 'userId' });
  };

  return user;
};
