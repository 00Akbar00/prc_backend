module.exports = (sequelize, DataTypes) => {
    const user_role = sequelize.define('user_role', {
     
        userId: {type: DataTypes.INTEGER,allowNull: false,
            references: {
              model: 'user', 
              key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
          roleId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
              model: 'role', 
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

    user_role.associate = (models) => {
        user_role.belongsTo(models.user, {
          foreignKey: 'userId',
          as: 'user',
        });
        user_role.belongsTo(models.role, {
          foreignKey: 'roleId',
          as: 'role',
        });
      };
  
    return user_role;
};
  