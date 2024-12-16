module.exports = (sequelize, DataTypes) => {
  const user_role = sequelize.define(
    'user_role',
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users', // The actual table name for the User model in your database
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      roleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'roles', // The actual table name for the Role model in your database
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
    },
    {
      timestamps: true,
      tableName: 'user_role', // The actual table name for the join table in your database
    }
  );

  return user_role;
};
