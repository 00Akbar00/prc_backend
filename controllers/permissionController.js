const {permission} = require('../models')


const getPermissions = async (req, res) => {
    try {
    const permissions = await permission.findAll({
       
    });

      res.status(200).json({ success: true, permissions });
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
};

module.exports = {getPermissions};