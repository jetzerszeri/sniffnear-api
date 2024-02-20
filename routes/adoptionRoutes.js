const express = require('express');
const router = express.Router();
const adoptionController = require('../controllers/adoptionController');

router.post('/', adoptionController.crearAdoption);

// Modificar una adopción por su ID
router.put('/:id', adoptionController.modificarAdoption);

// Eliminar una adopción por su ID
router.delete('/:id', adoptionController.eliminarAdoption);

// Listar todas las adopciones
router.get('/', adoptionController.listarAdoption);

// Listar una adopción por su ID
router.get('/:id', adoptionController.obtenerAdoptionPorId);

module.exports = router;