const { User } = require('../config/db'); // Adjust the path as needed

// Add User
const addUser = async (req, res) => {
  try {
    const { name, email, password, departmentId, roleId } = req.body;
   

    // Validate required fields
    if (!name || !email || !password || !departmentId || !roleId) {
      return res.status(400).json({ message: 'All fields (name, email, password, departmentId, roleId) are required.' });
    }

    // Check if email already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already exists. Please use a different email.' });
    }

    // Create the new user
    const user = await User.create({ name, email, password, departmentId, roleId });

    // Send success response
    res.status(201).json({
      message: 'User successfully created.',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        departmentId: user.departmentId,
        roleId: user.roleId,
      },
    });
  } catch (error) {
    // Handle unexpected errors
    res.status(500).json({ message: 'An error occurred while creating the user.', error: error.message });
  }
};

// Create User
const createUser = async (req, res) => {
  // Similar to addUser, but implement any additional logic here if needed
};

// Delete User
const deleteUser = async (req, res) => {
  try {
    const { id } = req.body;
    const user = await User.destroy({ where: { id } });
    if (user) {
      res.status(200).json({ message: 'User deleted successfully' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update User
const updateUser = async (req, res) => {
  try {
    const { id, name, email, departmentId, roleId } = req.body;
    const user = await User.update(
      { name, email, departmentId, roleId },
      { where: { id } }
    );
    if (user[0] > 0) {
      res.status(200).json({ message: 'User updated successfully' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Export the functions
module.exports = {
  addUser,
  createUser,
  deleteUser,
  updateUser,
};
