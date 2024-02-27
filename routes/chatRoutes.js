const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

// Ruta para crear una nueva sala de chat
router.post('/create', chatController.createChatRoom);

// Ruta para obtener las salas de chat del usuario
router.get('/user/:userId', chatController.getUserChatRooms);

// Ruta para enviar un mensaje a una sala de chat
router.post('/:roomId/send-message', chatController.sendMessage);

// Ruta para obtener todos los mensajes de una sala de chat específica
router.get('/:roomId/messages', chatController.getMessagesInRoom);

module.exports = router;

