const { user, user_role, user_department, department, role } = require('../models');
const bcrypt = require("bcrypt");


const getUsers = async (req, res) => {
  try {
    const users = await user.findAll({
      include: [
        {
          model: department,
          as: "departments", 
          attributes: ["id", "name"],
          through: { attributes: [] }, 
        },
        {
          model: role,
          as: "roles", 
          attributes: ["id", "name"],
          through: { attributes: [] }, 
        },
      ],
    });

    // Filter out users with the Admin role
    const filteredUsers = users.filter(
      (user) => !user.roles.some((role) => role.name === "Admin")
    );

    res.status(200).json({ success: true, users: filteredUsers });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};



// Add User
const addUser = async (req, res) => {
  try {
    const { name, email, password, roleIds, departmentIds } = req.body;

    // // Basic validation
    // if (!name || !email || !password || !roleIds || !departmentIds) {
    //   return res
    //     .status(400)
    //     .json({ message: "Name, email, password, roleIds, and departmentIds are required." });
    // }

    // Validate roleIds and departmentIds are arrays
    if (!Array.isArray(roleIds) || !Array.isArray(departmentIds)) {
      return res.status(400).json({
        message: "roleIds and departmentIds should be arrays.",
      });
    }

    // Hash the password using bcrypt
    const saltRounds = 10; // The cost factor
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create the user in the database with the hashed password
    const newUser = await user.create({
      name,
      email,
      password: hashedPassword, // Store the hashed password
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

const updateUser = async (req, res) => {
  try {
    const { id, name, email, departmentIds, roleIds } = req.body;

    // Find the user in the database
    const userToUpdate = await user.findByPk(id);

    if (!userToUpdate) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the basic user details
    await userToUpdate.update({ name, email });

    // Update the associations (assuming Sequelize is used)
    if (departmentIds) {
      const departments = await department.findAll({
        where: { id: departmentIds },
      });
      await userToUpdate.setDepartments(departments);
    }

    if (roleIds) {
      const roles = await role.findAll({
        where: { id: roleIds },
      });
      await userToUpdate.setRoles(roles);
    }

    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: error.message });
  }
};



module.exports = { updateUser };


// Export the functions
module.exports = {
  getUsers,
  addUser,
  deleteUser,
  updateUser,
};
