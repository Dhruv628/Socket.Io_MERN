const User = require("../models/UserModel");

const registerUser = async (req, res) => {
  try {
    const { name, email, phoneNumber } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(404).json({ error: "User already exists" });
    }
    const user = new User({ name, email, phoneNumber });
    await user.save();
    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) { 
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email:email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    user.online=true;
    await user.save();
    res.status(200).json({ message: "Login successful", user });
  } catch (error) { 
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const logoutUser = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({email:email});
    user.online=false;
    await user.save();
    res.status(200).json({ message: "Logout successful", user });
  } catch (error) { 
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getUsers,
};
