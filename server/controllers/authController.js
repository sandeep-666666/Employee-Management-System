import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";

//login for employee and admin
//POST /api/auth/login

export const logIn = async (req, res) => {
  try {
    const { email, password, role_type } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invaild credentials",
      });
    }
    if (role_type === "ADMIN" && user.role !== "ADMIN") {
      return res.status(401).json({
        success: false,
        message: "Not authorized as admin",
      });
    }
    if (role_type === "EMPLOYEE" && user.role !== "EMPLOYEE") {
      return res.status(401).json({
        success: false,
        message: "Not authorized as employee",
      });
    }
    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }
    const payload = {
      userId: user._id.toString(),
      role: user.role,
      email: user.email,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    return res.status(200).json({ user: payload, token });
  } catch (error) {
    console.log("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Login Failed",
    });
  }
};

// get session for employee and admin
//GET /api/auth/session

export const session = async (req, res) => {
  try {
    const session = req.session;
    return res.status(200).json({ user: session });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to get session",
    });
  }
};

//change password for employee and admin
//POST /api/auth/change-password

export const changePassword = async (req, res) => {
  try {
    const session = req.session;
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Both passwords are required",
      });
    }
    const user = await User.findById(session.userId);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }
    const isValid = await bcrypt.compare(currentPassword, user.password);
    if (!isValid) {
      return res.status(402).json({
        success: false,
        message: "Incorrect password",
      });
    }
    const hashed = await bcrypt.hash(newPassword, 10);

    await User.findByIdAndUpdate(session.userId, { password: hashed });
    return res.status(200).json({
      success: true,
      message: "Password changeedsuccessfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to change password",
    });
  }
};
