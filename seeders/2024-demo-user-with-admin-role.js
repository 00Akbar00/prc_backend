const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const saltRounds = 10;

    // Hash the password before inserting into the database
    const hashedPassword = await bcrypt.hash('password', saltRounds);

    await queryInterface.bulkInsert('users', [
      {
        name: 'akbar',
        email: 'admin@example.com',
        password: hashedPassword, // Use the hashed password
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
