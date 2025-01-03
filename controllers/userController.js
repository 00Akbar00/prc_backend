const { user, user_role, user_department, department, role, salary } = require('../models');
const bcrypt = require("bcrypt");

exports.getUsers = async (req, res) => {
  try {
    // Get the page and limit from query parameters, with fallback to default values
    let { page = 1, limit = 10 } = req.query;

      // Ensure that page and limit are numbers and positive
    page = Math.max(1, parseInt(page)) || 1; // Default to page 1
    limit = Math.max(1, parseInt(limit)) || 10; // Default to 10 items per page

    // Calculate the offset based on the current page
    const offset = (page - 1) * limit;

    // Fetch the total number of users for pagination
    const totalUsers = await user.count();

    // Fetch the users with salary details
    const users = await user.findAll({
      include: [
        {
          model: salary,
          as: 'salaries', // Alias for salary model
          attributes: ['id', 'basicSalary', 'deductions', 'netSalary', 'month', 'year'],
        },
        {
          model: department,
          as: 'departments',
          attributes: ['id', 'name'],
          through: { attributes: [] },
        },
        {
          model: role,
          as: 'roles',
          attributes: ['id', 'name'],
          through: { attributes: [] },
        },
      ],
      limit,  // Use the numeric limit
      offset,  // Use the numeric offset
    });

    // Filter out users with the "Admin" role at the database level (if applicable)
    const filteredUsers = users.filter(user =>
      !user.roles.some(role => role.name === 'Admin')
    );

    const totalPages = Math.ceil(totalUsers / limit);

    const hasPreviousPage = page > 1;
    const hasNextPage = page < totalPages;

    const previousPage = hasPreviousPage ? page - 1 : null;
    const nextPage = hasNextPage ? page + 1 : null;
    // Send response with pagination details and user data
    res.status(200).json({
      success: true,
      users: filteredUsers,
      totalUsers,
      totalPages,
      currentPage: page,
      previousPage,
      nextPage,
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

exports.addUser = async (req, res) => {
  try {
    const { name, email, password, roleIds, departmentIds } = req.body;

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

exports.deleteUser = async (req, res) => {
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

exports.updateUser = async (req, res) => {
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