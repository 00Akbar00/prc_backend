const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT;
const { sequelize } = require('./models');



// Middleware
app.use(express.json());

sequelize.sync({ force: false }) // Use `force: true` to drop and recreate tables (use carefully!)
  .then(() => console.log('Database synced.'))
  .catch((err) => console.error('Database sync error:', err));


app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})