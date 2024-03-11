const Joi = require('joi');

function Validate(req, res) {
  const schema = Joi.object().keys({
    userName: Joi.string().required(),
    password: Joi.string().min(6).max(250).required()
  });
  return schema.validate(req);
}

module.exports = Validate;
