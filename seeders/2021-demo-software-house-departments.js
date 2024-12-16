module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Insert software house-related departments
    await queryInterface.bulkInsert('departments', [
      {
        name: 'Software Development',
        slug: 'software-development',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Quality Assurance',
        slug: 'quality-assurance',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'UI/UX Design',
        slug: 'ui-ux-design',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Product Management',
        slug: 'product-management',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Project Management',
        slug: 'project-management',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'DevOps',
        slug: 'devops',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Customer Support',
        slug: 'customer-support',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Sales and Marketing',
        slug: 'sales-and-marketing',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    // Undo the software house-related department insertion
    await queryInterface.bulkDelete('departments', null, {});
  },
};
