const userModel = require('../models/UserModel.js');
const bcrypt = require('bcrypt');
const salt = 10;
const jwt = require('jsonwebtoken');
const clave = 'claveSecreta'; // Clave secreta para el token, debe ir en un archivo .env

exports.addUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || name.trim().length === 0 || name.length < 3) {
            return res.status(400).json({ message: 'Nombre no válido' });
        };

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email || !email.match(emailRegex)) {
            return res.status(400).json({ message: 'Correo electrónico no válido' });
        };

        const usuario = await userModel.findOne({email});
        if (usuario){
            return res.status(404).json({message: 'El email ya está registrado'});
        }

        if (!password || password.length < 6) {
            return res.status(400).json({ message: 'Contraseña no válida' });
        };

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

exports.getAllUsers = async (req, res) => {
    try{
        const users = await userModel.find();
        res.status(200).json({users});
    }catch(error){
        console.log(error);
        res.status(500).json({message: 'Hubo un error en el servidor'});
    }
}

exports.getUserById = async (req, res) => {
    try{

        const { userId } = req.params;
        const user = await userModel.findById(userId);

        if (!user){
            return res.status(404).json({message: 'Usuario no encontrado'});
        }

        //luego hay que buscar las mascotas del user y devolverlas en el json

        res.status(200).json({user});

    }catch(error){
        console.log(error);
        res.status(500).json({message: 'Hubo un error en el servidor'});
    }
}

exports.updateUser = async (req, res) => {
    try{
        const id = req.params.userId;
        const { name, email, password } = req.body;

        const user = await userModel.findById('65371db6d613a9dab1ceae80');
        console.log(user);

        if (!name || name.trim().length === 0 || name.length < 3) {
            return res.status(400).json({ message: 'Nombre no válido' });
        };

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !email.match(emailRegex)) {
            return res.status(400).json({ message: 'Correo electrónico no válido' });
        };

        if (!password || password.length < 6) {
            return res.status(400).json({ message: 'Contraseña no válida' });
        }

        const passwordHash = await bcrypt.hash(password, salt);

        const filter = { _id: id };
        const update = { name, email, password: passwordHash, updatedAt: Date.now() };

        const result = await userModel.findOneAndUpdate(filter, update);

        if (!result){
            return res.status(404).json({message: 'No se encontró ningún usuario con ese id'});
        }

        res.status(200).json({message: 'Usuario actualizado con éxito', user: result});

    }catch(error){
        console.log(error);
        res.status(500).json({message: 'Hubo un error en el servidor'});
    }
};