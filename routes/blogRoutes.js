const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');

router.post('/', blogController.crearBlog);

// Modificar una alerta por su ID
router.put('/:id', blogController.modificarBlog);

// Eliminar una alerta por su ID
router.delete('/:id', blogController.eliminarBlog);

// Listar todas las alertas
router.get('/', blogController.listarBlog);

// Listar una alerta por su ID
router.get('/:id', blogController.obtenerBlogPorId);

module.exports = router;