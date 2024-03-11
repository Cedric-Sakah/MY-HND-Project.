const Joi = require('joi');
const mongoose = require('mongoose');

const Shipment = mongoose.model('Shipment', new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 250
  },
  idNumber: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true // Ensures unique email addresses (optional)
  },
  phone: {
    type: String,
    required: true
  },
  town: {
    type: String,
    required: true
  },
  image:{
    data:Buffer,
    contentType:String

},
  homeAddress: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
}));

function validateShipment(shipment) {
  const schema = Joi.object().keys({
    fullName: Joi.string().min(3).max(250).required(),
    idNumber: Joi.string().required(),
    email: Joi.string().email().required().unique(), // Ensures email format and uniqueness (optional)
    phone: Joi.string().required(),
    town: Joi.string().required(),
    homeAddress: Joi.string().required(),
    date: Joi.date().required()
  });
  return schema.validate(shipment);
}

exports.Shipment = Shipment;
exports.validate = validateShipment;
