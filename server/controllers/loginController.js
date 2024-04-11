const bcrypt = require('bcrypt');
const { UserLogin, loginSchema } = require('../models/login');
const session = require('express-session');

const login = async (req, res) => {
  try {
    // Validate request body
    const { error } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    
    const user = await UserLogin.findOne({ where: { username: req.body.username } });

    if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
      return res.status(400).send('Invalid username or password.');
    }
    

    res.json({ message: 'Login successful', redirectUrl: '/home.html' }); // Send response once
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports.login = login;
