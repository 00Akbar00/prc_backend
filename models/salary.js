module.exports = (sequelize, DataTypes) => {
    const salary = sequelize.define('salary', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users', // Refers to the `user` model table name
          key: 'id',
        },
      },
      basicSalary: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      deductions: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
      },
      netSalary: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      month: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      year: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    });
  
    salary.associate = (models) => {
      salary.belongsTo(models.user, {
        foreignKey: 'userId',
      });
    };
  
    return salary;
};
  