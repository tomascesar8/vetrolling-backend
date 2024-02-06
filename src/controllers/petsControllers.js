// // const Pet = require('../models/PetModel');
// const Pet = require('../models/PetModel');
// const getPets = async (req, res) => {
//   try {
//     const pets = await Pet.find().populate({
//       path: 'turnos',
//       select: 'fecha hora -_id',
//       populate: {
//         path: 'veterinarian',
//         select: 'nombre -_id'
//       }   
//     })
//     res.status(200).json(pets);
//   } catch (error) {
//     console.error('An error occurred:', error);
//     res.status(500).json('Internal server error');
//   }
// }

// const createPet = async (req, res) => {
//   try {
//     const newPet = new Pet({
//       nombre: req.body.nombre,
//       especie: req.body.especie,
//       raza: req.body.raza
//     });
//     await newPet.save();
//     console.log(newPet);
//     res.status(201).json('la mascota se guardo');
//   } catch (error) {
//     console.error(error);
//     res.status(500).json('Error al guardar la mascota');
//   }
// }

// module.exports = {
//   getPets,
//   createPet
// }
//*****************************************************
// const Pet = require('../models/PetModel');

// const getPets = async (req, res) => {
//   try {
//     const pets = await Pet.find();
//     res.status(200).json(pets);
//   } catch (error) {
//     console.error('An error occurred:', error);
//     res.status(500).json('Internal server error');
//   }
// }

// const createPet = async (req, res) => {
//   try {
//     const newPet = new Pet({
//       nombre: req.body.nombre,
//       especie: req.body.especie,
//       raza: req.body.raza,
//     });
//     const savedPet = await newPet.save();
//     res.status(201).json({ pet: savedPet });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Error al guardar la mascota' });
//   }
// }

// const updatePet = async (req, res) => {
//   try {
//     const petId = req.params.petId;
//     const updatedPet = await Pet.findByIdAndUpdate(
//       petId,
//       {
//         nombre: req.body.nombre,
//         especie: req.body.especie,
//         raza: req.body.raza,
//       },
//       { new: true }
//     );
//     res.status(200).json('Mascota actualizada correctamente');
//   } catch (error) {
//     console.error(error);
//     res.status(500).json('Error al actualizar la mascota');
//   }
// }

// module.exports = {
//   getPets,
//   createPet,
//   updatePet,
// };
//*********************************************************

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
  try {
    const newPet = new Pet({
      nombre: req.body.nombre,
      especie: req.body.especie,
      raza: req.body.raza,
    });
    const savedPet = await newPet.save();
    res.status(201).json({ pet: savedPet });
  } catch (error) {
    console.error(error);
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
