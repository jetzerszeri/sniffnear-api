const petModel = require('../models/petModel');

//aquí van las funciones del controlador

exports.addPet = async (req, res) => {
    try{

        const { name, breed, type, birthdate, description, img, owner, sex, color1, color2, size } = req.body;
        if (!name || !type) {
            return res.status(400).json({ msg: 'Los campos name y type son obligatorios' });
        }

        const pet = new petModel({
            name,
            breed,
            type,
            birthdate,
            description,
            img,
            owner,
            sex,
            color1,
            color2,
            size
        });

        await pet.save();

        res.status(201).json({ message: 'Mascota creada con éxito', pet });

    }catch(error){
        console.log(error);
        res.status(500).json({message: 'Hubo un error en el servidor al crear la mascota'});
    }
};

exports.getAllPets = async (req, res) => {
    try{
        const pets = await petModel.find();
        res.status(200).json({pets});

    }catch(error){
        console.log(error);
        res.status(500).json({message: 'Hubo un error en el servidor al traer todas las mascotas'});
    }
};

exports.getPetById = async (req, res) => {
    try{
        const pet = await petModel.findById(req.params.id);

        if(!pet){
            return res.status(404).json({message: 'No existe una mascota con ese ID'});
        }
        res.status(200).json({pet});

    }catch(error){
        console.log(error);
        res.status(500).json({message: 'Hubo un error en el servidor al traer la mascota'});
    }
};

exports.updatePet = async (req, res) => {
    try{
        id = req.params.id;
        const { name, breed, type, age, description, img, owner, sex } = req.body;

        if (!name || !type) {
            return res.status(400).json({ msg: 'Los campos name y type son obligatorios' });
        }

        const filter = { _id: id };
        const update = {
            name,
            breed,
            type,
            age,
            description,
            img,
            sex,
            updatedAt: Date.now()
        };

        const result = await petModel.findByIdAndUpdate(filter, update);

        if(!result){
            return res.status(404).json({message: 'No existe una mascota con ese ID'});
        }

        res.status(200).json({message: 'Mascota actualizada con éxito', result});

    }catch(error){
        console.log(error);
        res.status(500).json({message: 'Hubo un error en el servidor al actualizar la mascota'});
    }
}

