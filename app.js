const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT;
const router = express.Router();
const sequelizeSync = require('./config/db');




// Middleware
app.use(express.json());


sequelizeSync();

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})