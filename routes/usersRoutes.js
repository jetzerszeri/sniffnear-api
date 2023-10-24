const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/', userController.addUser);
router.get('/', userController.getAllUsers);
router.get('/:userId', userController.getUserById);
router.put('/:userId', userController.updateUser);
router.delete('/:userId', userController.deleteUser);
router.post('/auth', userController.auth);

module.exports = router;