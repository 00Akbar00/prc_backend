const { sequelize } = require('../models');
const sequelizeSync = async () => {
    try {
      await sequelize.sync({ force: false }); // Use `force: true` to drop and recreate tables (use carefully!)
      console.log('Database synced.');
    } catch (err) {
      console.error('Database sync error:', err);
    }
  };
  
  module.exports = sequelizeSync;
    