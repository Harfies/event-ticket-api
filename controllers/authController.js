const Admin = require("../models/adminModel");
const generateToken = require("../utils/generateToken");
const asyncHandler = require("../middleware/asyncHandler");

// ===============================
// REGISTER ADMIN
// ===============================
exports.registerAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingAdmin = await Admin.findOne({ email });

    if (existingAdmin) {
      return res.status(400).json({
        success: false,
        message: "Admin already exists",
      });
    }

    const admin = await Admin.create({
      name,
      email,
      password,
    });

    res.status(201).json({
      success: true,
      message: "Admin registered successfully",

      token: generateToken(admin._id),

      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
      },
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// LOGIN ADMIN
// ===============================
exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // FIND ADMIN
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Invalid email",
      });
    }

    // CHECK PASSWORD
    const isMatch = await admin.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Wrong Password",
      });
    }

    res.status(200).json({
      success: true,
      message: "Login successful",
      token: generateToken(admin._id),

      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
      },
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
