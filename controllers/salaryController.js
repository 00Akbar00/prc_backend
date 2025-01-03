const { salary,user } = require('../models');
const nodemailer = require("nodemailer");

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
        // Fetch user's email from the database
        const selectedUser = await user.findOne({ where: { id: userId } }); // Adjust to match your ORM or database query
        if (!selectedUser || !selectedUser.email) {
            return res.status(404).json({ message: "User not found or email not available." });
        }

        const userEmail = selectedUser.email;
        console.log(userEmail)

        // Create new salary entry in the database
        const newSalary = await salary.create({
            basicSalary,
            deductions,
            netSalary,
            month,
            year,
            userId,
        });

        // Create transporter for sending email
        const transporter = nodemailer.createTransport({
            service: "Gmail", // or another email service provider
            auth: {
                user: "uchisauska@gmail.com", // Replace with your email
                pass: "fnzt qacn phqe wpmh", // Replace with your email password or app-specific password
            },
        });

        // Define email options
        const mailOptions = {
            from: 'noReply-email@gmail.com', // Replace with your email
            to: userEmail, // User's email fetched from the database
            subject: `Salary Slip for ${month} ${year}`,
            html: `
                <h1>Salary Slip</h1>
                <p>Dear ${user.name},</p> <!-- Adjust to use the user's name if available -->
                <p>Your salary slip for ${month} ${year} has been successfully generated.</p>
                <table style="border-collapse: collapse; width: 100%;" border="1">
                    <tr>
                        <th style="padding: 8px; text-align: left;">Basic Salary</th>
                        <td style="padding: 8px;">${basicSalary}</td>
                    </tr>
                    <tr>
                        <th style="padding: 8px; text-align: left;">Deductions</th>
                        <td style="padding: 8px;">${deductions}</td>
                    </tr>
                    <tr>
                        <th style="padding: 8px; text-align: left;">Net Salary</th>
                        <td style="padding: 8px;">${netSalary}</td>
                    </tr>
                </table>
                <p>Thank you,</p>
                <p>Your Company</p>
            `,
        };

        // Send the email
        await transporter.sendMail(mailOptions);

        // Return success response
        res.status(201).json({
            message: "Salary slip created successfully and email sent.",
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


exports.updateSalary = async (req, res) => {
  try {
    // Extract salaryId from request parameters and other fields from the request body
    const { id } = req.params; // Ensure `id` matches the parameter in the route
    const { basicSalary, deductions, netSalary, month, year, userId } = req.body;

    // Validate input
    if (!id) {
      return res.status(400).json({ message: "Salary ID is required." });
    }

    // Check if the record exists
    const salaryRecord = await salary.findByPk(id);
    if (!salaryRecord) {
      return res.status(404).json({ message: "Salary record not found." });
    }

    // Update the salary record
    salaryRecord.basicSalary = basicSalary || salaryRecord.basicSalary;
    salaryRecord.deductions = deductions || salaryRecord.deductions;
    salaryRecord.netSalary = netSalary || salaryRecord.netSalary;
    salaryRecord.month = month || salaryRecord.month;
    salaryRecord.year = year || salaryRecord.year;
    salaryRecord.userId = userId || salaryRecord.userId;

    // Save the updated record
    await salaryRecord.save();

    // Return success response
    res.status(200).json({
      message: "Salary record updated successfully.",
      salary: salaryRecord,
    });
  } catch (error) {
    console.error("Error updating salary record:", error);
    res.status(500).json({ message: "Internal server error.", error: error.message });
  }
};


exports.deleteSalary = async (req, res) => {
  try {
    // Extract salaryId from the request parameters
    const { salaryId } = req.params;

    if (!salaryId) {
      return res.status(400).json({ message: 'Salary ID is required.' });
    }

    // Find the salary record by ID
    const salaryRecord = await salary.findByPk(salaryId);

    if (!salaryRecord) {
      return res.status(404).json({ message: 'Salary record not found.' });
    }

    // Delete the salary record
    await salaryRecord.destroy();

    // Return success response
    res.status(200).json({ message: 'Salary record deleted successfully.' });
  } catch (error) {
    console.error('Error deleting salary record:', error);
    res.status(500).json({ message: 'Internal server error.', error: error.message });
  }
};
