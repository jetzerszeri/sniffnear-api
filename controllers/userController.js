const userModel = require('../models/UserModel.js');
const bcrypt = require('bcrypt');
const salt = 10;
const jwt = require('jsonwebtoken');
const clave = 'claveSecreta'; // Clave secreta para el token, debe ir en un archivo .env

