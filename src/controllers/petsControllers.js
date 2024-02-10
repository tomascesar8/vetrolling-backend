const Pet = require('../models/PetModel');

const getPets = async (req, res) => {
  try {
    const pets = await Pet.find();
    res.status(200).json(pets);
  } catch (error) {
    console.error('An error occurred:', error);
    res.status(500).json('Internal server error');
  }
}

const createPet = async (req, res) => {
  console.log(req.body,'+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
  try {
    const newPet = new Pet({
      nombre: req.body.nombre,
      especie: req.body.especie,
      raza: req.body.raza,
    });
    const savedPet = await newPet.save();
    console.log(savedPet, '--------------------------------------------------------------------------------------------------------------');
    res.status(201).json({ pet: savedPet, message: 'Mascota guardada correctamente' });
  } catch (error) {
    console.
    error(error);
    res.status(500).json({ message: 'Error al guardar la mascota' });
  }
}

const updatePet = async (req, res) => {
  try {
    const petId = req.params.petId;
    const updatedPet = await Pet.findByIdAndUpdate(
      petId,
      {
        nombre: req.body.nombre,
        especie: req.body.especie,
        raza: req.body.raza,
      },
      { new: true }
    );
    res.status(200).json({ message: 'Mascota actualizada correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar la mascota' });
  }
}

const deletePet = async (req, res) => {
  try {
    const petId = req.params.petId;
    await Pet.findByIdAndDelete(petId);
    res.status(200).json({ message: 'Mascota eliminada correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar la mascota' });
  }
}

module.exports = {
  getPets,
  createPet,
  updatePet,
  deletePet, // Nueva función para eliminar mascotas
};
