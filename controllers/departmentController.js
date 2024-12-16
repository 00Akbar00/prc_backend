const { user, role, department, user_role, user_department } = require('../models');

const getDepartments = async (req, res) => {
    try {
      const departments = await department.findAll({
        attributes: ['id', 'name'], // Fetch only necessary fields
      });
      res.status(200).json({
        message:'Departments fetched successfully',
        departments
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to fetch departments.' });
    }
};

const addDepartment = async (req, res) => {
  try {
    const { name } = req.body;

    // Validate input
    if (!name) {
      return res.status(400).json({ message: 'Department name is required.' });
    }

    // Generate slug (for example, convert name to lowercase and replace spaces with hyphens)
    const slug = name.toLowerCase().replace(/\s+/g, '-');

    // Create a new department with the generated slug
    const newDepartment = await department.create({ name, slug });

    res.status(201).json({
      message: 'Department created successfully.',
      department: newDepartment,
    });
  } catch (error) {
    console.error('Error:', error); // Log the actual error
    res.status(500).json({
      message: 'Failed to add department.',
      error: error.message, // Send error message for debugging
    });
  }
};


const deleteDepartment = async (req, res) => {
  try {
    // Extract the department id from the request parameters
    const { id } = req.params;

    // Validate input
    if (!id) {
      return res.status(400).json({ message: 'Department ID is required.' });
    }

    // Find the department by ID
    const existingDepartment = await department.findByPk(id);

    if (!existingDepartment) {
      return res.status(404).json({ message: 'Department not found.' });
    }

    // Delete the department from the database
    await existingDepartment.destroy();

    // Send a success response
    res.status(200).json({
      message: 'Department deleted successfully.',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to delete department.' });
  }
};
module.exports = {getDepartments, addDepartment, deleteDepartment};