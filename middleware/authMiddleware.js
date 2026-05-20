const jwt = require("jsonwebtoken");
const Admin = require("../models/adminModel");

const protect = async (req, res, next) => {
  try {
    let token;

    //CHECK AUTH HEADER
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];

      //VERIFY TOKEN
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      //GET ADMIN
      req.admin = await Admin.findById(decoded.id).select("-password");

      next();
    } else {
      return res.status(401).json({
        success: false,
        message: "Not authorized, no token",
      });
    }
  } catch (error) {
    console.log(error.message);

    return res.status(401).json({
      success: false,
      message: "Token failed",
    });
  }
};

module.exports = protect;
