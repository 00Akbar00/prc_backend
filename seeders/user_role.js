module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.bulkInsert('user_role', [
        {
          userId: 1, // Example user ID
          roleId: 1, // Example role ID
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ], {});
    },
  
    down: async (queryInterface, Sequelize) => {
      await queryInterface.bulkDelete('user_role', null, {});
    },
  };
  