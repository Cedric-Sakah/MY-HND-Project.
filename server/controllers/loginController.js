const Validate = require('../models/login');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const { User } = require('../models/user');
const express = require('express');
const app = express();

// Define login route
const login = async (req, res) => {
  // Validate request body
  const { error } = Validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Find user by userName
  const user = await User.findOne({ userName: req.body.userName });

  // Check if user exists
  if (!user) return res.status(400).send('Invalid userName or password.');

  // Validate password
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send('Unauthorized access');

  // Login successful
  // Redirect to the home page
  res.redirect('/home');
  console.log("Login successful");
};

// Define route to serve home.html
app.get('/home', (req, res) => {
  res.sendFile(html + '/../html/home.html');
});

// Export login function
module.exports.login = login;


