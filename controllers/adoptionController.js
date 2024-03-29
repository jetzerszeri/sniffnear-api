const Adoption = require('../models/adoptionModel');

// Crear una nueva adopción
exports.crearAdoption = async (req, res) => {
  try {
    const {adoptionType, type, size, birthdate, breedType, color1, name, breed, city, content, img, sex, owner, creator, pet } = req.body;

    // const userId = req.usuario; 
    // if(!adoptionType || !description || !status){
    //   return res.status(400).json({msg:'Los campos de titulo y descripcion o estado  no pueden estar vacios'})
    // }
    const adoption = new Adoption({
      adoptionType, 
      type,
      name,
      birthdate,
      breed,
      breedType,
      sex,
      size,
      color1,
      city,
      content,
      img,
      owner,
      creator,
      pet
    });

   
    await adoption.save();

    res.status(201).json({
      msg: 'Adopción creada exitosamente',
      data: adoption,
    });
  } catch (error) {
    console.error('Error al crear la adopción:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// Modificar una adopción por su ID
exports.modificarAdoption = async (req, res) => {
  try {
    const data = req.body;
    const adoptionId = req.params.id;

    const filter = {_id: adoptionId };
 
    const adoption = await Adoption.findByIdAndUpdate(filter, data);

    if (!adoption) {
      return res.status(404).json({ msg: 'Adopción no encontrada' });
    }

    const adoptionActualizada = await Adoption.findById(adoptionId);
    res.json({
      msg: 'Adopción modificada exitosamente',
      data: adoptionActualizada,
    });
  } catch (error) {
    console.error('Error al modificar la adopción:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// Eliminar una adopción por su ID
exports.eliminarAdoption = async (req, res) => {
  try {
    const adoptionId = req.params.id;

    const adoption = await Adoption.findByIdAndRemove(adoptionId);

    if (!adoption) {
      return res.status(404).json({ msg: 'Adopción no encontrada' });
    }

    res.json({ msg: 'Adopción eliminada exitosamente' });
  } catch (error) {
    console.error('Error al eliminar la adopción:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// Listar todas las adopción
exports.listarAdoption = async (req, res) => {
  try {
    const adoptions = await Adoption.find().populate('creator pet');

    res.json(adoptions);
  } catch (error) {
    console.error('Error al listar las adopciones:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// Listar una adopción por su ID
exports.obtenerAdoptionPorId = async (req, res) => {
  try {
    const adoptionId = req.params.id;

    const adoption = await Adoption.findById(adoptionId).populate('creator pet');

    if (!adoption) {
      return res.status(404).json({ msg: 'Adopción no encontrada' });
    }

    res.json(adoption);
  } catch (error) {
    console.error('Error al obtener la adopción por ID:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};
