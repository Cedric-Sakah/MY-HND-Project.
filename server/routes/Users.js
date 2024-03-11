const usersController = require('../controllers/usersController')
const express = require('express');
const router = express.Router();


router.get('/',usersController.getAllUsers);
router.post('/', usersController.createUser);
router.put('/:id',usersController.updateUser);
router.delete('/:id', usersController.deleteUser);
router.get('/:id', usersController.getUserById);

module.exports = router;
