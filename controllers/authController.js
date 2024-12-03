const userModel = require('../models/user');

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    let user = await userModel.findOne({ where: { email } });

    if (!user) {
      return res.json({
        success: false,
        status: 400,
        message: "User does not exist with this email.",
      });
    }

    // Directly compare the entered password with the stored password
    if (user.password !== password) {
      return res.json({
        success: false,
        status: 400,
        message: "Invalid password.",
      });
    }

    // Check if the user is an admin
    if (user.isAdmin) { 
      return res.json({
        success: true,
        status: 200,
        message: "Login successful, redirecting to Admin Dashboard.",
        dashboard: "admin", // Redirect to admin dashboard
      });
    } else {
      return res.json({
        success: true,
        status: 200,
        message: "Login successful, redirecting to User Dashboard.",
        dashboard: "user", // Redirect to user dashboard
      });
    }

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
