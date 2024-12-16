const { role } = require('../models');

const getRoles = async (req, res) => {
  try {
    const roles = await role.findAll({
      attributes: ['id', 'name'], // Fetch only necessary fields
    });
    res.status(200).json({
      message: 'Roles fetched successfully',
      roles
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch roles.' });
  }
};

const addRole = async (req, res) => {
  try {
    const { name } = req.body;

    // Validate input
    if (!name) {
      return res.status(400).json({ message: 'Role name is required.' });
    }

    // Generate slug (for example, convert name to lowercase and replace spaces with hyphens)
    const slug = name.toLowerCase().replace(/\s+/g, '-');

    // Create a new role with the generated slug
    const newRole = await role.create({ name, slug });

    res.status(201).json({
      message: 'Role created successfully.',
      role: newRole,
    });
  } catch (error) {
    console.error('Error:', error); // Log the actual error
    res.status(500).json({
      message: 'Failed to add role.',
      error: error.message, // Send error message for debugging
    });
  }
};


const deleteRole = async (req, res) => {
  try {
    // Extract the role id from the request parameters
    const { id } = req.params;

    // Validate input
    if (!id) {
      return res.status(400).json({ message: 'Role ID is required.' });
    }

    // Find the role by ID
    const existingRole = await role.findByPk(id);

    if (!existingRole) {
      return res.status(404).json({ message: 'Role not found.' });
    }

    // Delete the role from the database
    await existingRole.destroy();

    // Send a success response
    res.status(200).json({
      message: 'Role deleted successfully.',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to delete role.' });
  }
};

module.exports = { getRoles, addRole, deleteRole }; // Named export
