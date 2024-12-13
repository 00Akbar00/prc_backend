module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Insert a new user into the `users` table
    await queryInterface.bulkInsert('users', [
      {
        name: 'akbar',
        email: 'admin@example.com',
        password: 'password', // Remember to hash the password in production
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    // Undo the user insertion
    await queryInterface.bulkDelete('users', null, {});
  },
};
