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


const {
  getUsers, 
  addUser,
  deleteUser,
  updateUser
} = require('./controllers/userController');

const {
  getDepartments,
  addDepartment,
  deleteDepartment
} = require('./controllers/departmentController');

const {
  getRoles,
  addRole,
  deleteRole
} = require('./controllers/roleController');



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
    origin: 'http://localhost:3000', // Frontend URL
    methods: ['GET', 'POST'],
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
      return next(err);  // Handle any unexpected errors
    }
    if (!user) {
      return res.status(400).json({
        success: false,
        message: info?.message || 'Login failed. Please check your credentials.'
      });
    }

    req.logIn(user, (err) => {
      if (err) {
        return next(err);  // Handle any login errors
      }

      // Determine role based on user's status
      const role = user.isAdmin ? 'admin' : 'user';

      // Set the 'role' cookie (used by middleware)
      res.cookie('dashboard', role, {
        httpOnly: true,      // Prevent access by client-side JavaScript
        secure: process.env.NODE_ENV === 'production', // Use HTTPS in production
        sameSite: 'strict',  // Prevent cross-site requests
        maxAge: 24 * 60 * 60 * 1000  // Cookie expiration: 1 day
      });

      // Send success response with role and other necessary info
      return res.status(200).json({
        success: true,
        message: `Logged in as ${role}`,
        role: role,   // Return the role variable
        user: { id: user.id, username: user.username }  // Optionally send user info
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

//Logout route
app.get('/logout', (req, res, next) => {
  req.logout((err) => { 
      if (err) {
          // Pass the error to the error handler middleware
          return next(err);
      }

      // Clear the cookies by setting their Max-Age to 0
      res.clearCookie('user', { path: '/' });
      res.clearCookie('role', { path: '/' });

      // Redirect to the homepage or login page after logout
      res.redirect('/');
  });
});


// Role Routes
app.get('/roles', getRoles);
app.post('/addRole', addRole);
app.delete('/deleteRole/:id', deleteRole);

// Department Routes
app.get('/departments', getDepartments);
app.post('/addDepartment', addDepartment);
app.delete('/deleteDepartment/:id', deleteDepartment);

// User Routes
app.get("/Users", getUsers);
app.post("/addUser", addUser);       
app.delete("/deleteUser/:id", deleteUser); 
app.put("/updateUser", updateUser);    




sequelizeSync();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
