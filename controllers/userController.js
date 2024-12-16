const { user, user_role, user_department, department, role } = require('../models');



const getUsers = async (req, res) => {
  try {
    const users = await user.findAll({
      include: [
        {
          model: department,
          as: "departments",  // Ensure this matches your association alias
          attributes: ["id", "name"],
          through: { attributes: [] }  // Exclude the join table columns
        },
        {
          model: role,
          as: "roles",  // Ensure this matches your association alias
          attributes: ["id", "name"],
          through: { attributes: [] }  // Exclude the join table columns
        },
      ],
    });

    res.status(200).json({ success: true, users });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};



// Add User
const addUser = async (req, res) => {
  try {
    const { name, email, password, roleIds, departmentIds } = req.body;

    // Basic validation
    if (!name || !email || !password || !roleIds || !departmentIds) {
      return res
        .status(400)
        .json({ message: "Name, email, password, roleIds, and departmentIds are required." });
    }

    // Validate roleIds and departmentIds are arrays
    if (!Array.isArray(roleIds) || !Array.isArray(departmentIds)) {
      return res.status(400).json({
        message: "roleIds and departmentIds should be arrays.",
      });
    }

    // Create the user in the database without hashing the password
    const newUser = await user.create({
      name,
      email,
      password, // Using the raw password without hashing
    });

    // Assign multiple roles to the user
    const userRoles = await Promise.all(
      roleIds.map((roleId) =>
        user_role.create({
          userId: newUser.id,
          roleId,
        })
      )
    );

    // Assign multiple departments to the user
    const userDepartments = await Promise.all(
      departmentIds.map((departmentId) =>
        user_department.create({
          userId: newUser.id,
          departmentId,
        })
      )
    );

    return res.status(201).json({
      message: "User created and assigned roles and departments successfully",
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      },
      roles: userRoles,
      departments: userDepartments,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "An error occurred while creating the user and assigning roles/departments.",
    });
  }
};

// Delete User
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;  
    const deletedUser = await user.destroy({ where: { id } });

    if (deletedUser) {
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
  getUsers,
  addUser,
  deleteUser,
  updateUser,
};
