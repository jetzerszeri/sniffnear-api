const Alert = require('../models/alertModel');

// Crear una nueva alerta
exports.crearAlerta = async (req, res) => {
  try {
    const {alertType, type, size, color1, color2, breed, description, latitude, longitude, date, time, img, personName, email, password, creator, pet, status, sex, petName, state,city, country, breedType } = req.body;

    // const userId = req.usuario; 
    // if(!alertType || !description || !status){
    //   return res.status(400).json({msg:'Los campos de titulo y descripcion o estado  no pueden estar vacios'})
    // }
    const alerta = new Alert({
      alertType, 
      type, 
      size, 
      color1, 
      color2, 
      breed, 
      description, 
      latitude, 
      longitude, 
      date, 
      time, 
      img, 
      personName, 
      email, 
      password, 
      creator, 
      pet, 
      status,
      sex,
      petName,
      state,
      city,
      country,
      breedType,
    });

   
    await alerta.save();

    res.status(201).json({
      msg: 'Alerta creada exitosamente',
      message: 'Alerta creada exitosamente',
      alert: alerta,
      data: alerta,
    });
  } catch (error) {
    console.error('Error al crear la alerta:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// Modificar una alerta por su ID
exports.modificarAlerta = async (req, res) => {
  try {
    // const { title, description, status } = req.body;
    const alertaId = req.params.id;
    const updateData = req.body;
    // const updateData = {
    //   type: req.body.type,
    //   size: req.body.size, 
    //   color1: req.body.color1, 
    //   sex:req.body.sex,
    //   description: req.body.description,
    //   latitude: req.body.latitude,
    //   longitude: req.body.longitude,
    //   date: req.body.date,
    //   time: req.body.time,
    //   img: req.body.img,
    // }
    const alerta = await Alert.findByIdAndUpdate(
      alertaId,
      // { title, description, status },
      { $set: updateData},
      { new: true }
    );

    if (!alerta) {
      return res.status(404).json({ msg: 'Alerta no encontrada' });
    }

    res.json({
      msg: 'Alerta modificada exitosamente',
      data: alerta,
    });
  } catch (error) {
    console.error('Error al modificar la alerta:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// Eliminar una alerta por su ID
exports.eliminarAlerta = async (req, res) => {
  try {
    const alertaId = req.params.id;

    const alerta = await Alert.findByIdAndRemove(alertaId);

    if (!alerta) {
      return res.status(404).json({ msg: 'Alerta no encontrada' });
    }

    res.json({ msg: 'Alerta eliminada exitosamente' });
  } catch (error) {
    console.error('Error al eliminar la alerta:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// Listar todas las alertas
exports.listarAlertas = async (req, res) => {
  try {
    const alertas = await Alert.find().populate('creator pet');

    res.json(alertas);
  } catch (error) {
    console.error('Error al listar las alertas:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// Listar una alerta por su ID
exports.obtenerAlertaPorId = async (req, res) => {
  try {
    const alertaId = req.params.id;

    const alerta = await Alert.findById(alertaId).populate('creator pet');

    if (!alerta) {
      return res.status(404).json({ msg: 'Alerta no encontrada' });
    }

    res.json(alerta);
  } catch (error) {
    console.error('Error al obtener la alerta por ID:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};
