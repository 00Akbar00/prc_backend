module.exports = (sequelize, DataTypes) => {
  const department = sequelize.define('department', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    slug: { type: DataTypes.STRING, allowNull: false },
  });

  department.associate = (models) => {
    department.belongsToMany(models.user, {
      through: models.user_department,
      foreignKey: 'departmentId',
      otherKey: 'userId',
      as: 'users',
    });
  };
  
  return department;
};
