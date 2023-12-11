const Veterinarian = require('../models/VeterinarianModel');

const getVeterinarians = async (req, res) => {
  try {
    const veterinarians = await Veterinarian.find();
    res.status(200).json(veterinarians);
  } catch (error) {
    console.error(error);
    res.status(500).json('Error al obtener veterinarios');
  }
}

module.exports = {
  getVeterinarians
}