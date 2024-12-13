module.exports = (sequelize, DataTypes) => {
    const user_department = sequelize.define('user_department', {
     
        userId: {type: DataTypes.INTEGER,allowNull: false,
            references: {
              model: 'user', 
              key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
          departmentId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
              model: 'department', 
              key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
        }, {
          timestamps: true, 
          tableName: 'RolePermissions', 
        }
    );

    user_department.associate = (models) => {
        user_department.belongsTo(models.user, {
          foreignKey: 'userId',
          as: 'user',
        });
        user_department.belongsTo(models.department, {
          foreignKey: 'departmentId',
          as: 'department',
        });
      };
    
  
    return user_department;
};
  