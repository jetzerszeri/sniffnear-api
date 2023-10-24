const express = require('express');
const router = express.Router();
const petController = require('../controllers/petController');

router.post('/', petController.addPet);

module.exports = router;