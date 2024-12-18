const checkPermission = (requiredPermission) => {
  return (req, res, next) => {
    // Ensure the user object exists
    const user = req.user || null; // Explicit check

    console.log("User in middleware:", user);

    if (!user) return res.status(401).json({ message: 'Unauthorized' });

    // If the user is an admin, allow access to all routes
    if (user.admin) return next();

    // If user has permissions, check for the required permission
    if (user.roles && user.roles.permissions && user.roles.permissions.includes(requiredPermission)) {
      return next(); // Proceed if permission is granted
    }

    return res.status(403).json({ message: 'Forbidden: No permission' });
  };
};

module.exports = checkPermission;
