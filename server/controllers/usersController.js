const bcrypt = require('bcrypt');
const User = require('../models/user');

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.send(users);
  } catch (error) {
    res.status(500).send('Error retrieving users from the database.');
  }
};

// Create user
const createUser = async (req, res) => {
  try {
    // Check if user with provided email already exists
  
    const existingUser = await User.findOne({ where: { email: req.body.email,phone_number:req.body.phone_number} });
    if (existingUser) {
      // If user already exists, send error response
      return res.status(400).send('User Already exist');
    }

    // Hash the password with a salt of 10 letters
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Create user using req.body, replacing plain text password with hashed password
    const user = await User.create({
      ...req.body,
      password: hashedPassword
    });

    // Redirect to the homepage upon successful user creation
    res.json({ message: 'Login successful', redirectUrl: '/home.html' }); // Send response once
  } catch (error) {
    res.status(400).send(error.message);
  }
};



// Update user
const updateUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).send('User not found.');

    // Update user properties
    await user.update(req.body);
    res.send(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Delete user
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).send('User not found.');

    await user.destroy();
    res.send(user);
  } catch (error) {
    res.status(500).send('Error deleting user.');
  }
};

// Get user by ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).send('User not found.');

    res.send(user);
  } catch (error) {
    res.status(500).send('Error retrieving user.');
  }
};

module.exports = { getAllUsers, createUser, updateUser, deleteUser, getUserById };
