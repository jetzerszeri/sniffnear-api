const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', (req, res) => {
    res.status(200).json({
        message: 'Endpoint de usuarios funcionando'
    });
})

router.post('/', userController.addUser);

module.exports = router;