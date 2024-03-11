const loginController = require('../controllers/loginController')
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.post('/', loginController.login);

module.exports = router;

