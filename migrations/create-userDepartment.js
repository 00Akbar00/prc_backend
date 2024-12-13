module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('user_departments', {
        userId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'users',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        departmentId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'departments',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false,
        },
      });
    },
  
    down: async (queryInterface, Sequelize) => {
      await queryInterface.dropTable('user_departments');
    },
  };
  