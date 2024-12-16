module.exports = (sequelize, DataTypes) => {
  const role_permission = sequelize.define('role_permission', {
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
    permissionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'permissions', 
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
  }, {
    timestamps: true, 
    tableName: 'role_permission', // Ensure the table name matches the one in the database
  });

  return role_permission;
};
