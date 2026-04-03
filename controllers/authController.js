// ======================
// 🔹 IMPORTS
// ======================
const User = require("../models/User"); 
// Mongoose model → DB operations

const bcrypt = require("bcryptjs"); 
// Password hashing library

const generateToken = require("../utils/generateToken"); 
// JWT token generator

// ======================
// 🔹 REGISTER CONTROLLER
// ======================
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  // ======================
  // 🔹 CHECK USER EXISTS
  // ======================
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  // ======================
  // 🔹 HASH PASSWORD
  // ======================
  const hashedPassword = await bcrypt.hash(password, 10);
  // password → encrypted form

  // ======================
  // 🔹 CREATE USER
  // ======================
  const user = await User.create({
    name,
    email,
    password: hashedPassword
  });

  // ======================
  // 🔹 RESPONSE + TOKEN
  // ======================
  res.json({
    _id: user._id,
    name: user.name,
    token: generateToken(user._id)
  });
};

// ======================
// 🔹 LOGIN CONTROLLER
// ======================
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // ======================
  // 🔹 FIND USER
  // ======================
  const user = await User.findOne({ email });

  // ======================
  // 🔹 VERIFY PASSWORD
  // ======================
  if (user && (await bcrypt.compare(password, user.password))) {

    // ======================
    // 🔹 SUCCESS RESPONSE
    // ======================
    res.json({
      _id: user._id,
      name: user.name,
      token: generateToken(user._id)
    });

  } else {
    // ======================
    // 🔹 ERROR
    // ======================
    res.status(401).json({ message: "Invalid credentials" });
  }
};

// ======================
// 🔹 EXPORT
// ======================
module.exports = { registerUser, loginUser };