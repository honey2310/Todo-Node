import jwt from "jsonwebtoken";

export const isAuthentication = (req, res, next) => {
  try {
    const token = req.cookies.Auth_token;

    if (!token) {
      return res.status(401).json({ success: false, message: "Signin first" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded; // { id, email, iat, exp }
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid or expired token" });
  }
};
