module.exports = (sequelize, DataTypes) => {
  const Department = sequelize.define('Department', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Department.associate = (models) => {
    // One department has many users
    Department.hasMany(models.User, {
      foreignKey: 'departmentId',
      as: 'users',
    });

    // One department has many permissions through DepartmentPermission
    // Department.belongsToMany(models.Permission, {
    //   through: models.DepartmentPermission,  // Specify the join table (model)
    //   foreignKey: 'departmentId',
    //   otherKey: 'permissionId',
    //   as: 'permissions',  // Alias for the association
    // });
  };

  return Department;
};
