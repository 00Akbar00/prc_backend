const express = require('express');
const app = express();
const passport = require('passport');
const session = require('express-session');
const sequelizeSync = require('./config/db');
const LocalStrategy = require('passport-local').Strategy;
require('dotenv').config();
const PORT = process.env.PORT;
const cors = require("cors");
const router = express.Router();
const { user: CustomUser, role: Role, user_role: UserRole } = require('./models'); // Adjusted model imports
const bcrypt = require("bcrypt");
const cookieParser = require('cookie-parser');


const {addUserValidation, updateUserValidation} = require('./middlewares/validations/userValidation')
const {addRoleValidation} = require('./middlewares/validations/roleValidation')
const {loginValidation} = require('./middlewares/validations/authValidation')
const {addDepartmentValidation} = require('./middlewares/validations/departmentValidation')

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
  deleteRole,
} = require('./controllers/roleController');

const { 
  getPermissions, 
  assignPermissionsToRole
} = require('./controllers/permissionController');

// Enable cookie parsing
app.use(cookieParser());

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
passport.use(
  new LocalStrategy(
    { usernameField: 'email', passwordField: 'password' }, // Explicitly define fields
    async (email, password, done) => {
      try {
        // Find the user by email and include roles
        const user = await CustomUser.findOne({ where: { email }, include: ['roles'] });
        if (!user) {
          return done(null, false, { message: 'User not found' });
        }

        // Compare the provided password with the hashed password in the database
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return done(null, false, { message: 'Invalid password' });
        }

        return done(null, user); // If passwords match, return the user
      } catch (err) {
        return done(err); // Handle errors
      }
    }
  )
);

// Serialize and Deserialize User
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await CustomUser.findByPk(id, { include: ['roles'] }); // Include roles
    done(null, user);
  } catch (err) {
    done(err);
  }
});

// Login route
app.post('/login', loginValidation, (req, res, next) => {
  passport.authenticate('local', async (err, user, info) => {
    if (err) {
      console.error('Authentication Error:', err);
      return next(err);
    }
    if (!user) {
      return res.status(400).json({
        success: false,
        message: info?.message || 'Login failed. Please check your credentials.',
      });
    }

    req.logIn(user, (err) => {
      if (err) {
        console.error('Login Error:', err);
        return next(err);
      }
      

      // Check if the user has an 'Admin' role
      const role = user.roles.some(role => role.name === 'Admin') ? 'Admin' : 'User';

      // Set a cookie for the dashboard role
      res.cookie('dashboard', role, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // HTTPS in production
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 * 1000, // 1 day
      });

      return res.status(200).json({
        success: true,
        message: `Logged in as ${role}`,
        role,
        user: { id: user.id, username: user.name },
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
app.post('/addRole', addRoleValidation, addRole);
app.delete('/deleteRole/:id', deleteRole);
app.post('/assign-permissions', assignPermissionsToRole);

// Department Routes
app.get('/departments', getDepartments);
app.post('/addDepartment', addDepartmentValidation, addDepartment);
app.delete('/deleteDepartment/:id', deleteDepartment);

// User Routes
app.get("/Users", getUsers);
app.post("/addUser", addUserValidation, addUser);       
app.delete("/deleteUser/:id", deleteUser); 
app.put("/updateUser/:id",updateUserValidation, updateUser);

// Permission Routes
app.get('/permissions', getPermissions)
    




sequelizeSync();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
