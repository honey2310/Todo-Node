import { authCollection } from "../models/auth_Model.js";

export const allowRoles = (...allowedRoles) => {
  return async (req, res, next) => {
    try {
      const userId = req.user.id;

      const user = await authCollection.findById(userId);

      if (!user) {
        return res.json({
          status: false,
          message: "User not found",
        });
      }

      if (!allowedRoles.includes(user.role)) {
        return res.json({
          status: false,
          message: "Unauthorized Access",
        });
      }

      // attach role
      req.user.role = user.role;

      next();
    } catch (err) {
      res.json({
        status: false,
        message: "Role verification failed",
      });
    }
  };
};
