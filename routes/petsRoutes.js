const express = require('express');
const router = express.Router();
const petController = require('../controllers/petController');

router.post('/', petController.addPet);
router.get('/', petController.getAllPets);
router.get('/:id', petController.getPetById);
router.put('/:id', petController.updatePet);

module.exports = router;