const userModel = require('../models/UserModel.js');
const bcrypt = require('bcrypt');
const salt = 10;
const jwt = require('jsonwebtoken');
const clave = 'claveSecreta'; // Clave secreta para el token, debe ir en un archivo .env

exports.addUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const passwordHash = await bcrypt.hash(password, salt);

        const user = new userModel({
            name,
            email,
            password: passwordHash
        });

        await user.save();

        res.status(201).json({ message: 'Usuario creado con éxito', user });

    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Hubo un error en el servidor'});
    }
}