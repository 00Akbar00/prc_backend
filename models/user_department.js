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
          tableName: 'user_department', 
        }
    );

  return user_department;
};
  