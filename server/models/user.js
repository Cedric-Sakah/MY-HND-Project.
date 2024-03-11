const Joi = require('joi');

const mongoose = require('mongoose');
const User = mongoose.model('User', new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 250
  },
  email: {
    type: String,
    required: true,
    unique: true
  },

  phone: {
    type: Number,
    required: true,
    minlength: 9,
    maxlength: 11
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 250
  },

}));

function validateUser(user) {
  const schema = Joi.object().keys({
    userName: Joi.string().min(3).max(250).required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'org'] } }).required(),
    phone: Joi.string().min(9).max(11).required(),
    password: Joi.string().min(6).max(250).required()
  });

  // Validate the user input against the schema
  const { error } = schema.validate(user);
  if (error) {
    // If validation fails, return the error message or handle it accordingly
    return error.details[0].message;
  } else {
    // If validation is successful, redirect to the home page
    return "../html/home.html";
  }
}

module.exports = { User, validateUser };




