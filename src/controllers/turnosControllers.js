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

// const createTurno = async (req, res) => {
//   try {
//     const turno = new Turno(req.body);
//     console.log(turno);
//     await turno.save();
//     res.status(201).json({message: 'Turno creado exitosamente', turno});
//   }catch (error) {
//     console.error(error);
//     res.status(500).json('Error al guardar el turno');
//   }
// }
const createTurno = async (req, res) => {
  try {
    // Extraer la información del cuerpo de la solicitud
    const turnoData = req.body;

    // Crear el turno
    const turno = new Turno(turnoData);

    // Guardar el turno en la base de datos
    await turno.save();

    // Vincular el turno a la mascota
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