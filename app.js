const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT;
const router = express.Router();
const sequelizeSync = require('./config/db');
const {login} = require('./controllers/authController');
const cors = require("cors");



// Middleware
app.use(express.json());
app.use(cors());


app.get('/',(req,res)=>{
    res.send('hello this si my app')
})
// login route
app.post('/login', login)


sequelizeSync();

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})