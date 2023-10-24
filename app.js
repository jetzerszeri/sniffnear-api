const express = require('express');
const dataBase = require('./dataBase');

const app = express();
const port = 3000;

app.use(express.json());

//me conecto a la DB
dataBase.once('error', () => console.log('Error al conectar a la DB'));
dataBase.once('open', () => console.log('Conectado a la DB'));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});