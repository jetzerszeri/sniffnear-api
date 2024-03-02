const express = require('express');
const dataBase = require('./dataBase');
const routerApi = require('./routes');
const cors = require('cors');
const http = require('http');
const { Server } = require("socket.io");
const Message = require ('./models/messageModel.js');

const app = express();
const port = 3000;
const server = http.createServer(app);

app.use(express.json());
app.use(cors());

const io = new Server(server,{
  cors:{
    origin:'*'
  }
})

io.on("connection",(socket) => {

  socket.on("joinRoom",(roomId)=>{
    socket.join(roomId); 
  })
  socket.on('sendMessage',async (data)=>{
    try{
      const {roomId, sender, text} = data;
     
      const newMessage = new Message ({
        chatRoom:roomId,
        sender:sender,
        text:text,
      });
      
      await newMessage.save();
      io.to(roomId).emit('sendMessage',newMessage);

    }catch(error){
      console.log('error al enviar el mensaje', error )
    }
  })
});


//me conecto a la DB
dataBase.once('error', () => console.log('Error al conectar a la DB'));
dataBase.once('open', () => console.log('Conectado a la DB'));



app.get('/', (req, res) => {
    res.status(200).json({
        message: 'SniffNear API REST by Jake'
    });
});

routerApi(app);

server.listen(port, ()=>{
  console.log(`Server is running on port ${port}`);
  console.log(`Updated: ${new Date().toLocaleString()}`);
});
// app.listen(port, () => {
   
//     console.log(`Server is running on port ${port}`);
//     console.log(`Updated: ${new Date().toLocaleString()}`);
// });