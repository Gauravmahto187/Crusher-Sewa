import bcrypt from "bcrypt";
import User from "../models/User.js";
import { generateToken } from "../utils/generateToken.js";

export const createUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(400).json({ 
      message: "Please provide name, email, password, and role" 
    });
  }

  // Validate role
  const validRoles = ["ADMIN", "MANAGER", "CONTRACTOR"];
  if (!validRoles.includes(role)) {
    return res.status(400).json({ 
      message: "Invalid role. Must be ADMIN, MANAGER, or CONTRACTOR" 
    });
  }

  if (name.trim().length < 2) {
    return res.status(400).json({ 
      message: "Name must be at least 2 characters long" 
    });
  }

  if (password.length < 6) {
    return res.status(400).json({ 
      message: "Password must be at least 6 characters long" 
    });
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ 
      message: "Please enter a valid email address" 
    });
  }

  try {
    const existing = await User.findOne({ email: email.toLowerCase().trim() });
    if (existing) {
      return res.status(400).json({ 
        message: "This email is already registered. Please use a different email." 
      });
    }

    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password,
      role: role,
      isActive: true,
    });

    return res.status(201).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
      },
      message: `${role} account created successfully for ${user.name}`,
    });
  } catch (err) {
    if (err.name === "ValidationError") {
      const errors = Object.values(err.errors).map(e => e.message);
      return res.status(400).json({ 
        message: errors[0] || "Validation failed. Please check your input." 
      });
    }
    return res.status(500).json({ 
      message: "Something went wrong while creating the user account. Please try again." 
    });
  }
};

// Keep createManager for backward compatibility
export const createManager = createUser;

export const listUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });
    return res.json({ users });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Failed to fetch users", error: err.message });
  }
};

export const updateUserStatus = async (req, res) => {
  const { id } = req.params;
  const { isActive } = req.body;

  if (typeof isActive !== "boolean") {
    return res.status(400).json({ message: "isActive must be a boolean" });
  }

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.isActive = isActive;
    await user.save();

    return res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
      },
      message: `User ${isActive ? "activated" : "deactivated"} successfully`,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Failed to update user status", error: err.message });
  }
};

