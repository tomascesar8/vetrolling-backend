const { Types } = require('mongoose');
const ObjectId = Types.ObjectId;
const { getUsuarios } = require('../controllers/usersControllers');
const { getVeterinarians } = require('../controllers/veterinariansControllers');

const Turno = require('../models/TurnoModel');
const User = require('../models/UserModel');

const getTurnos = async (req, res) => {
  try {
    const turnos = await Turno.find().populate('veterinarian', '-_id -imagen').populate({
      path: 'user',
      select: 'nombre -_id',
      populate: {
        path: 'pet',
        select: '-_id -createdAt -updatedAt'
      }
    });
    res.status(200).json(turnos);
  } catch (error) {
    console.log(error);
    res.status(500).json('Error al buscar turnos');
  }
}

const getTurno = async (req, res) => {
  try {
    const { id } = req.params;
    const turno = await Turno.findById(id).populate('user', 'nombre').populate('veterinarian', '-_id -imagen');
    res.status(200).json({ turno });
  } catch (error) {
    console.log(error);
    res.status(500).json('Error al buscar el turno');
  }
};

const createTurno = async (req, res) => {
  try {
    const turnoData = req.body;
    const turno = new Turno(turnoData);
    await turno.save();

    await User.findByIdAndUpdate(
      turnoData.user,
      { $push: { turnos: turno._id }},
      { new: true } 
    );
    res.status(201).json({ message: 'Turno creado exitosamente', turno });
  } catch (error) {
    console.error(error);
    res.status(500).json('Error al guardar el turno');
  }
}

const updateTurno = async (req, res) => {
  try {
    const { _id, ...data } = req.body;

    await Turno.findOneAndUpdate({ _id: ObjectId(_id) }, { $set: data }, { new: true });

    // Obtén la lista de usuarios y veterinarios
    const usuarios = await getUsuarios();
    const veterinarios = await getVeterinarians();

    res.render('editarTurno', { usuarios, veterinarios, /* otras variables necesarias */ });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar el turno' });
  }
};

const deleteTurno = async (req, res) => {
  try {
    const { id } = req.params;
    const turnoDelete = await Turno.findByIdAndDelete(id);

    await User.updateMany(
      { turnos: id },
      { $pull: { turnos: id }},
      { new: true }
    );

    res.status(200).json({ message: 'Turno eliminado exitosamente', turnoDelete });
  } catch (error) {
    console.error(error);
    res.status(500).json('Error al eliminar el turno');
  }
}

module.exports = {
  getTurnos,
  getTurno,
  createTurno,
  updateTurno,
  deleteTurno
};
