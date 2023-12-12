// const Pet = require('../models/PetModel');
const Pet = require('../models/PetModel');
const getPets = async (req, res) => {
  try {
    const pets = await Pet.find().populate({
      path: 'turnos',
      select: 'fecha hora -_id',
      populate: {
        path: 'veterinarian',
        select: 'nombre -_id'
      }   
    })
    res.status(200).json(pets);
  } catch (error) {
    console.error('An error occurred:', error);
    res.status(500).json('Internal server error');
  }
}

const createPet = async (req, res) => {
  try {
    const newPet = new Pet({
      nombre: req.body.nombre,
      especie: req.body.especie,
      raza: req.body.raza
    });
    await newPet.save();
    console.log(newPet);
    res.status(201).json('la mascota se guardo');
  } catch (error) {
    console.error(error);
    res.status(500).json('Error al guardar la mascota');
  }
}

module.exports = {
  getPets,
  createPet
}