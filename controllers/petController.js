const petModel = require('../models/petModel');

//aquí van las funciones del controlador

exports.addPet = async (req, res) => {
    try{

        const { name, breed, type, age, description, img, owner, sex } = req.body;
        if (!name || !type) {
            return res.status(400).json({ msg: 'Los campos name y type son obligatorios' });
        }

        const pet = new petModel({
            name,
            breed,
            type,
            age,
            description,
            img,
            owner,
            sex,
        });

        await pet.save();

        res.status(201).json({ message: 'Mascota creada con éxito', pet });

    }catch(error){
        console.log(error);
        res.status(500).json({message: 'Hubo un error en el servidor'});
    }
};