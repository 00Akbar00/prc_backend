const authorizeByRole = (requiredRoles) => {
    return (req, res, next) => {
      try {
        // Extract the 'dashboard' cookie
        const userRole = req.cookies.dashboard;
  
        // If no role is found in the cookie, deny access
        if (!userRole) {
          return res.status(403).json({
            success: false,
            message: 'Access denied. Role not found.',
          });
        }
  
        // Check if the role in the cookie is in the required roles
        if (!requiredRoles.includes(userRole)) {
          return res.status(403).json({
            success: false,
            message: 'Access denied. You do not have the required role.',
          });
        }
  
        // If the role matches, allow access
        next();
      } catch (error) {
        console.error('Authorization Middleware Error:', error);
        res.status(500).json({
          success: false,
          message: 'An error occurred during authorization.',
        });
      }
    };
  };
  
  module.exports = authorizeByRole;