const Turno = require('../models/TurnoModel');
const Pet = require('../models/PetModel');

const getTurnos = async (req, res) => {
  try{
    const turnos = await Turno.find().populate('pet').populate('veterinarian'); ;
    console.log(turnos);
    res.status(200).json(turnos);
  } catch(error){
    console.log(error)
    res.status(500).json('Error al buscar turnos');
  }
}

const createTurno = async (req, res) => {
  try {
    const turnoData = req.body;
    const turno = new Turno(turnoData);
    await turno.save();

    await Pet.findByIdAndUpdate(
      turnoData.pet,
      { $push: { turnos: turno._id } },
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
    const { _id } = req.body;
    const turno = await Turno.findByIdAndUpdate(_id, req.body, {new: true});
    console.log(turno);
    res.status(200).json({ message: 'Turno actualizado exitosamente', turno });
  } catch (error) {
    console.error(error);
    res.status(500).json('Error al actualizar el turno');
  }
}

const deleteTurno = async (req, res) => {
  try {
    const turno = await Turno.findByIdAndDelete(req.body._id);
    console.log(turno);
    res.status(200).json({message: 'Turno eliminado exitosamente', turno});
  } catch (error) {
    console.error(error);
    res.status(500).json('Error al eliminar el turno');
  }
}

module.exports = {
  getTurnos,
  createTurno,
  updateTurno,
  deleteTurno
}