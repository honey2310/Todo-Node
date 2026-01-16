import jwt from "jsonwebtoken";

export const isAuthentication = (req, res, next) => {
  try {
    console.log("Cookies:", req.cookies);
    const token = req.cookies.Auth_token;

    // 1️⃣ Check cookie exists
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Signin first",
      });
    }

    // 2️⃣ Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3️⃣ Attach user info to request
    req.user = decoded; // { id, email, iat, exp }

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};
