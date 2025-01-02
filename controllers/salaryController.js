const { salary } = require('../models');

exports.getSalary = async (req, res) => {
  try {
    // Extract userId from the query parameters
    const userId = req.query.userId;

    if (!userId) {
      return res.status(400).json({ message: 'User ID is required.' });
    }

    // Fetch all salary records for the specific user
    const salaryRecords = await salary.findAll({ where: { userId: userId } });

    if (salaryRecords.length === 0) {
      return res.status(404).json({ message: 'No salary records found for the specified user.' });
    }

    // Send the salary records as the response
    res.status(200).json(salaryRecords);
  } catch (error) {
    console.error('Error fetching salary records:', error);
    res.status(500).json({ message: 'Internal server error.', error: error.message });
  }
};



exports.addSalary = async (req, res) => {
    const { basicSalary, deductions, netSalary, month, year, userId } = req.body;
  
    // Validate input
    if (!basicSalary || !netSalary || !month || !year || !userId) {
      return res.status(400).json({ message: "All fields are required." });
    }
  
    try {
      // Create new salary entry in the database
      const newSalary = await salary.create({
        basicSalary,
        deductions,
        netSalary,
        month,
        year,
        userId, 
      });
  
      // Return success response
      res.status(201).json({
        message: "Salary slip created successfully",
        salary: newSalary,
      });
    } catch (error) {
      console.error(error);
      // Return error response
      res.status(500).json({
        message: "An error occurred while adding the salary.",
        error: error.message,
      });
    }
};

exports.updateSalary = async (res, req) => {
    
}

exports.deleteSalary = async (res, req) => {
    
}