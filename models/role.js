module.exports = (sequelize, DataTypes) => {
    const Role = sequelize.define('Role', {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      name: { type: DataTypes.STRING, allowNull: false, unique: true }, // E.g., "Mid-Level Developer"
    }, {});
  
    Role.associate = (models) => {
      Role.hasMany(models.User, { foreignKey: 'roleId' }); // A role can have many users
      Role.belongsToMany(models.Permission, { through: 'RolePermissions', foreignKey: 'roleId' });
    };
  
    return Role;
  };
  