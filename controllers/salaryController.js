const { salary } = require('../models');

exports.getSalary = async (res, req) => {
    
}

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
        message: "Salary added successfully.",
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