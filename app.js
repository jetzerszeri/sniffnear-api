const express = require('express');
const dataBase = require('./dataBase');
const routerApi = require('./routes');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

//me conecto a la DB
dataBase.once('error', () => console.log('Error al conectar a la DB'));
dataBase.once('open', () => console.log('Conectado a la DB'));


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