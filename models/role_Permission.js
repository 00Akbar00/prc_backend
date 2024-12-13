module.exports = (sequelize, DataTypes) => {
  const role_permission = sequelize.define('role_permission', {
    roleId: {type: DataTypes.INTEGER,allowNull: false,
      references: {
        model: 'role', 
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    permissionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Permissions', 
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
  }, {
    timestamps: true, 
    tableName: 'role_permission', 
  });

  
  // role_permission.associate = (models) => {
    
  //   role_permission.belongsTo(models.Role, {
  //     foreignKey: 'roleId',
  //     as: 'role',
  //   });

  //   role_permission.belongsTo(models.Permission, {
  //     foreignKey: 'permissionId',
  //     as: 'permission',
  //   });
  // };

  return role_permission;
};
