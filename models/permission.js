module.exports = (sequelize, DataTypes) => {
  const Permission = sequelize.define('Permission', {
    id: { 
      type: DataTypes.INTEGER, 
      autoIncrement: true, 
      primaryKey: true 
    },
    name: { 
      type: DataTypes.STRING, 
      allowNull: false, 
      unique: true // Ensures permission names are unique
    },
  }, {
    tableName: 'Permissions', // Optional: Explicitly specify the table name
    timestamps: false,       // Optional: Disable timestamps if not needed
  });

  Permission.associate = (models) => {
    Permission.belongsToMany(models.Role, { 
      through: 'RolePermissions', 
      foreignKey: 'permissionId', 
      otherKey: 'roleId', // Ensures clarity in the join table keys
      onDelete: 'CASCADE', // Optional: Remove permissions from RolePermissions if deleted
      onUpdate: 'CASCADE', // Optional: Update associated RolePermissions on changes
    });
  };

  return Permission;
};
