const User = require("../models/User.model");
const { findUserByEmail } = require("../services/user.service");
const bcrypt = require('bcrypt');
// Register User Controller
const register = async (req, res) => {
  const { name, email, password, role } = req.body;
  
  try {
    let user = await findUserByEmail(email);
    if (user) {
      return res.status(400).json({
        message: "User already exists",
      });
    }
    user = new User({
      name,
      email,
      password,
      role,
    });
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).json({
      message: "User created successfully",
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Server Error",
    });
  }
};


// Login User Controller
const login = async (req, res) => {
  const { email, password } = req.body;  
  try {
    const user = await User.findByCredentials(email, password);   
    if (!user) {
        return res.status(400).json({
            message: "Invalid Credentials",
        });
    }  
    
    if(user.tokens.length === 3){
        return res.status(400).json({
            message: "You have reached the maximum number of login users to logged You should logout first.",
        });
    }
    const token = await user.generateAuthToken();
    res.status(200).json({
      message: "User logged in successfully",
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Credential is probably wrong "+ err,
    });
  }
};

// Get User Controller
const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.status(200).json({
      message: "User retrieved successfully",
      user,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

// Update User Controller
const updateUser = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation) {
    return res.status(400).json({
      message: "Invalid updates!",
    });
  }
  try {
    const user = await User.findById(req.user._id);
    updates.forEach((update) => (user[update] = req.body[update]));
    await user.save();
    res.status(200).json({
      message: "User updated successfully",
      user,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

// Delete User Controller
const deleteUser = async (req, res) => {
  try {
    await req.user.remove();
    res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

// Export User Controller
module.exports = {
  register,
  login,
  getUser,
  updateUser,
  deleteUser,
};
