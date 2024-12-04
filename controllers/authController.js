// authController.js
const passport = require('passport');

exports.login = passport.authenticate('local', {
  successRedirect: '/dashboard',  // Redirect after successful login
  failureRedirect: '/login',      // Redirect on failure
  failureFlash: true
});
