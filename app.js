const express = require('express');
const dataBase = require('./dataBase');
const routerApi = require('./routes');
const cors = require('cors');
const http = require('http')
const { Server } = require("socket.io");

const app = express();
const port = 3000;
const server = http.createServer(app);
app.use(express.json());
app.use(cors());
const io = new Server(server,{
  cors:{
    origin: "*" 
  }

})
//me conecto a la DB
dataBase.once('error', () => console.log('Error al conectar a la DB'));
dataBase.once('open', () => console.log('Conectado a la DB'));

//Creacion servidor http

// Configuración de socket.io
// const io = socketIo(server, {
//     cors: {
//         origin: "http://localhost:3000",
//         methods: ["GET", "POST"],
//       },
// });
app.use('/socket.io', (req, res) => {
    // Aquí puedes agregar cualquier lógica necesaria para manejar las solicitudes de Socket.IO
    console.log('Solicitud recibida en la ruta /socket.io');
    // Envía una respuesta 200 OK
    res.sendStatus(200);
});
//Conexion con socket
io.on('connection', (socket) => {
    console.log('Un cliente se ha conectado');
  
    // Manejar evento 'chatsUpdated'
    socket.on('chatsUpdated', (updatedChats) => {
      console.log('Chats actualizados:', updatedChats);
      // Aquí puedes emitir los chats actualizados a todos los clientes conectados
      io.emit('chatsUpdated', updatedChats);
    });
  
    socket.on('disconnect', () => {
      console.log('Un cliente se ha desconectado');
    });
  });
  


app.get('/', (req, res) => {
    res.status(200).json({
        message: 'SniffNear API REST by Jake'
    });
});

routerApi(app);


app.listen(port, () => {
    //el socket que escuhcha
    console.log(io)
    console.log(`Server is running on port ${port}`);
    console.log(`Updated: ${new Date().toLocaleString()}`);
});