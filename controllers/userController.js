const { user, role, department, user_role, user_department } = require('../models');

// Add User
const addUser = async (req, res) => {
  try {
    const { name, email, password, roleId, departmentId } = req.body;

    // Basic validation
    if (!name || !email || !password || !roleId || !departmentId) {
      return res.status(400).json({ message: 'Name, email, password, roleId, and departmentId are required.' });
    }

    // Create the user in the database without hashing the password
    const newUser = await user.create({
      name,
      email,
      password, // Using the raw password without hashing
    });

    // Assign role to the user
    const userRole = await user_role.create({
      userId: newUser.id,
      roleId: roleId,
    });

    // Assign department to the user
    const userDepartment = await user_department.create({
      userId: newUser.id,
      departmentId: departmentId,
    });

    return res.status(201).json({
      message: 'User created and assigned role and department successfully',
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      },
      role: userRole,
      department: userDepartment,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'An error occurred while creating the user and assigning role/department.' });
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
