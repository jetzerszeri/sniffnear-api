const express = require('express');
const router = express.Router();
const alertController = require('../controllers/alertController');

router.post('/', alertController.crearAlerta);

// Modificar una alerta por su ID
router.put('/:id', alertController.modificarAlerta);

// Eliminar una alerta por su ID
router.delete('/:id', alertController.eliminarAlerta);

// Listar todas las alertas
router.get('/', alertController.listarAlertas);

// Listar una alerta por su ID
router.get('/:id', alertController.obtenerAlertaPorId);

module.exports = router;