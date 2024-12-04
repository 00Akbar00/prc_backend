const express = require('express');
const app = express();
const passport = require('passport');
const session = require('express-session');
const sequelizeSync = require('./config/db');
const LocalStrategy = require('passport-local').Strategy;
const { User } = require('./models');  // Import the User model
require('dotenv').config();
const PORT = process.env.PORT;
const cors = require("cors");
const router = express.Router();

// Middleware
app.use(express.json());
const corsOptions = {
    origin: 'http://localhost:3000', 
    credentials: true,
};

app.use(cors(corsOptions));

// Set up session middleware for storing the user session
app.use(session({
    secret: process.env.SESSION_SECRET || 'fallbackSecret', 
    resave: false,
    saveUninitialized: false
}));

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

// Passport Local Strategy
passport.use(new LocalStrategy(
    { usernameField: 'email', passwordField: 'password' }, // Explicitly define fields
    async (email, password, done) => {
        try {
            const user = await User.findOne({ where: { email } });

            if (!user) return done(null, false, { message: 'User not found' });

            // Compare passwords (use a hashed comparison for production)
            if (user.password !== password) {
                return done(null, false, { message: 'Invalid password' });
            }

            return done(null, user);
        } catch (err) {
            return done(err);
        }
    }
));

// Serialize and deserialize user to store user data in session
passport.serializeUser((user, done) => {
    done(null, user.id);  // Store the user's ID in the session
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findByPk(id);
        done(null, user);
    } catch (err) {
        done(err);
    }
});

// Custom login route
app.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(400).json({ success: false, message: info.message || 'Login failed' });
        }
    
        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }
    
            // Send success flag and dashboard type
            return res.status(200).json({
                success: true,
                message: 'Login successful',
                dashboard: user.isAdmin ? 'admin' : 'user',  // Send either 'admin' or 'user' based on the user type
                user: user
            });
        });
    })(req, res, next);
    
});

// Define dashboard route (adminDash and userDash)
app.get('/adminDash', (req, res) => {
    if (!req.user || !req.user.isAdmin) {
        return res.status(403).send('Access Denied');
    }
    res.json({
        message: 'Welcome to the Admin Dashboard!',
        user: req.user
    });
});

app.get('/userDash', (req, res) => {
    if (!req.user || req.user.isAdmin) {
        return res.status(403).send('Access Denied');
    }
    res.json({
        message: 'Welcome to the User Dashboard!',
        user: req.user
    });
});

// Logout route
// app.get('/logout', (req, res) => {
//     req.logout((err) => {
//         if (err) return res.status(500).send('Error logging out');
//         res.redirect('/');
//     });
// });

sequelizeSync();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
