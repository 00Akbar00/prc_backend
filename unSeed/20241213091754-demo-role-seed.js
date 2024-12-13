module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Add a new user to the `users` table and return the inserted user
    const [user] = await queryInterface.bulkInsert('users', [
      {
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'adminpassword', // Hash password in production
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], { returning: true });

    // Get the 'admin' role by its slug
    const roles = await queryInterface.sequelize.query(
      `SELECT * FROM roles WHERE slug = 'admin'`
    );

    // Ensure we have at least one role
    if (roles[0].length === 0) {
      throw new Error('Role "admin" not found');
    }

    const adminRole = roles[0][0];

    // Assign the 'admin' role to the user in the `user_roles` table
    await queryInterface.bulkInsert('user_roles', [
      {
        userId: user.id,
        roleId: adminRole.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    // Undo the user and role assignment
    await queryInterface.bulkDelete('user_roles', null, {});
    await queryInterface.bulkDelete('users', null, {});
  },
};
