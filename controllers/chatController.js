const Chat = require('../models/chatModel');
const Message = require ('../models/messageModel')

exports.createChatRoom = async (req, res) => {
  try {
      const { participants } = req.body;

      // Verificar si ya existe una sala de chat entre los mismos participantes
      const existingRoom = await Chat.findOne({ participants: { $all: participants } });
      if (existingRoom) {
          return res.status(400).json({ error: "Ya existe una sala de chat entre estos usuarios" });
      }

      // Crear una nueva sala de chat
      const newChatRoom = new Chat({
          participants
      });
      await newChatRoom.save();

      res.status(201).json(newChatRoom);
  } catch (error) {
      console.error("Error al crear la sala de chat:", error);
      res.status(500).json({ error: "Error al crear la sala de chat" });
  }
};

//btener las salas de chat en las que el usuario participa
exports.getUserChatRooms = async (req, res) => {
  try {
      const userId = req.params.userId;

      // Buscar todas las salas de chat donde el usuario es un participante
      const chatRooms = await Chat.find({ participants: userId });

      res.status(200).json(chatRooms);
  } catch (error) {
      console.error("Error al obtener las salas de chat del usuario:", error);
      res.status(500).json({ error: "Error al obtener las salas de chat del usuario" });
  }
};

//enviar un mensaje a una sala de chat específica.
exports.sendMessage = async (req, res) => {
  try {
      const { roomId } = req.params;
      const { sender, text } = req.body;

      // Crear un nuevo mensaje
      const newMessage = new Message({
          chatRoom: roomId,
          sender,
          text
      });
      await newMessage.save();

      res.status(201).json(newMessage);
  } catch (error) {
      console.error("Error al enviar el mensaje:", error);
      res.status(500).json({ error: "Error al enviar el mensaje" });
  }
};

//obtener los mensajes de la sala
exports.getMessagesInRoom = async (req, res) => {
  try {
      const roomId = req.params.roomId;

      // Buscar todos los mensajes en la sala de chat específica
      const messages = await Message.find({ chatRoom: roomId });

      res.status(200).json(messages);
  } catch (error) {
      console.error("Error al obtener los mensajes de la sala de chat:", error);
      res.status(500).json({ error: "Error al obtener los mensajes de la sala de chat" });
  }
};

//buscar una sala de chat
exports.findChatRoom = async (req, res)=>{
     const {emisorId, destinatarioId} = req.body;
    try {
        const existingRoom = await Chat.findOne({
            participants:{ $all: [emisorId, destinatarioId]}
        })
       if(existingRoom){
        console.log("sala encontrada")
        res.status(200).json(existingRoom);
       }else{
        return res.status(404).json({ message: 'No se encontró ninguna sala existente.' });
       }

    } catch (error) {
        console.error('Error al buscar la sala de chat existente:', error);
    }
}