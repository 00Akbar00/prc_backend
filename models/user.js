
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
  });

  user.associate = (models) => {
    user.belongsToMany(models.department, {
      through: models.user_department, // The join table
      foreignKey: 'userId',
      otherKey: 'departmentId',
      as: 'departments',
    });
  
    user.belongsToMany(models.role, {
      through: models.user_role, // The join table
      foreignKey: 'userId',
      otherKey: 'roleId',
      as: 'roles',
    });
  };

  return user;
};
