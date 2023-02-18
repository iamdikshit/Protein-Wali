import AppError from "../services/appError.js";

export const PermittedRoles = (...permittedRoles) => {
  // Middleware for doing Role-Based Permissions

  // Return Middleware
  return (req, _res, next) => {
    
    // Taking Out user from Request
    const { user } = req;

    // Checking Whether user role is in the permittedRoles List
    if (!permittedRoles.includes(user.role)) {
      return next(
        new AppError("Permission Denied!", 403)
      ); // user is Forbidden
    };

    next(); // Role is Allowed, So Continue on the Next Middleware

  };
};
