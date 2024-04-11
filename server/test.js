const Validate = require('../models/login');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const { User } = require('../models/user');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const express = require('express');
app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

function Validate(req, res) {
  const schema = Joi.object().keys({
    userName: Joi.string().required(),
    password: Joi.string().min(6).max(250).required()
  });
  return schema.validate(req);
}
const login = async (req, res) => {
  const { error } = Validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const user = await User.findOne({ userName: req.body.userName });
  if (!user) return res.status(400).send('Invalid userName or password.');
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send('Unauthorized access');
  console.log("Login successful");
};
router.post('/', loginController.login);
app.use('/api/login',login);
mongoose.connect('mongodb://127.0.0.1:27017/MyhndProjectDb')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...',err));
app.use('/api/login',login);
app.listen(3000, () => console.log('listening on port 3000...'));




