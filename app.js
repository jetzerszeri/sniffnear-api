const express = require('express');
const dataBase = require('./dataBase');
const routerApi = require('./routes');
const cors = require('cors');
const http = require('http')
const socketIo = require('socket.io');

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

//me conecto a la DB
dataBase.once('error', () => console.log('Error al conectar a la DB'));
dataBase.once('open', () => console.log('Conectado a la DB'));

//Creacion servidor http
const server = http.createServer(app);

//Config de socket.io
const io = require('socket.io')(server, {
    cors: {
        origin: '*'
    }
});

//Conexion con socket
io.on('connection', socket => {
    console.log('Usuario conectado');

    socket.on('disconnect', () => {
        console.log('Usuario desconectado');
    });
});


app.get('/', (req, res) => {
    res.status(200).json({
        message: 'SniffNear API REST by Jake'
    });
});

routerApi(app);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    console.log(`Updated: ${new Date().toLocaleString()}`);
});