const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Pet = require('../models/PetModel');
const Turno = require('../models/TurnoModel');


const getUsers = async (req, res) => {
  try {
    const users = await User.find().populate("pet").populate("turnos");
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ ok: false, message: "Error al buscar usuarios" });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).populate("pet");
    if (!user) {
      res.status(404).json({ ok: false, message: "Usuario no encontrado" });
      return;
    }
    res.status(200).json({ ok: true, message: "Usuario encontrado", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, message: "Error al obtener el usuario por ID" });
  }
};

//?
// const createUser = async (req, res) => {
//   try {
//     // const newPet = new Pet(req.body.pet);
//     // await newPet.save();

//     const newUser = new User({
//       nombre: req.body.nombre,
//       email: req.body.email,
//       password: req.body.password,
//       role: req.body.role,
//       turnos: req.body.turnos,
//       pet: newPet._id,
//     });

//     if (newUser.password.length < 6 || newUser.password.length > 30) {
//       res.status(400).json({ ok: false, message: 'La contraseña debe tener entre 6 y 30 caracteres' });
//       return;
//     }

//     const salt = await bcrypt.genSalt(10);
//     newUser.password = await bcrypt.hash(newUser.password, salt);

//     await newUser.save();

//     res.status(201).json({ ok: true, message: 'Usuario creado exitosamente', newUser });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ ok: false, message: 'Error al guardar el usuario' });
//   }
// };
//?

// const createUser = async (req, res) => {
//   console.log(req.body);
//   try {
//     const newUser = new User({
//       nombre: req.body.nombre,
//       email: req.body.email,
//       password: req.body.password,
//       role: req.body.role,
//       turnos: req.body.turnos,
//       pet: req.body.pet.id, // Usar el ID de la mascota enviada desde el frontend
//     });

//     if (newUser.password.length < 6 || newUser.password.length > 30) {
//       res.status(400).json({ ok: false, message: 'La contraseña debe tener entre 6 y 30 caracteres' });
//       return;
//     }

//     const salt = await bcrypt.genSalt(10);
//     newUser.password = await bcrypt.hash(newUser.password, salt);

//     await newUser.save();

//     res.status(201).json({ ok: true, message: 'Usuario creado exitosamente', newUser });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ ok: false, message: 'Error al guardar el usuario' });
//   }
// };

const createUser = async (req, res) => {
  console.log(req.body);
  try {
    // Crear la mascota y esperar a que se guarde
    const newPet = new Pet({
      nombre: req.body.pet.nombre,
      especie: req.body.pet.especie,
      raza: req.body.pet.raza,
    });

    const savedPet = await newPet.save();

    // Crear el usuario con la referencia al documento de mascota
    const newUser = new User({
      nombre: req.body.nombre,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
      turnos: req.body.turnos,
      pet: savedPet._id, // Usar el ID de la mascota guardada
    });

    if (newUser.password.length < 6 || newUser.password.length > 30) {
      res.status(400).json({ ok: false, message: 'La contraseña debe tener entre 6 y 30 caracteres' });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(newUser.password, salt);

    await newUser.save();

    res.status(201).json({ ok: true, message: 'Usuario creado exitosamente', newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, message: 'Error al guardar el usuario' });
  }
};


// const updateUser = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { password, ...otherUpdates } = req.body;

//     if (password) {
//       const salt = await bcrypt.genSalt(10);
//       otherUpdates.password = await bcrypt.hash(password, salt);
//     }
//     const user = await User.findByIdAndUpdate(id, otherUpdates, { new: true, runValidators: true });

//     res.status(200).json({ ok: true, message: 'Usuario actualizado exitosamente', user });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ ok: false, message: 'Error al actualizar el usuario' });
//   }
// };
//*
// const updateUser = async (req, res) => {
//   try {
//     const { role, pet } = req.body;

//     // Manejar el caso en el que pet sea nulo
//     const petId = pet ? pet.id : null;

//     const updatedUser = await User.findByIdAndUpdate(
//       req.params.id,
//       { role, pet: { id: petId, nombre: pet ? pet.nombre : null } },
//       { new: true }
//     );

//     res.json({ user: updatedUser });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "ERROR AL ACTUALIZAR USUARIO" });
//   }
// };
//*

const updateUser = async (req, res) => {
  try {
    const { role, pet } = req.body;

    // Actualizar el usuario con el nuevo role
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true }
    );

    // Si hay una mascota proporcionada, actualizar el nombre de la mascota
    if (pet && pet.nombre) {
      await Pet.findByIdAndUpdate(updatedUser.pet, { nombre: pet.nombre });
    }

    res.json({ user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "ERROR AL ACTUALIZAR USUARIO" });
  }
};






// const deleteUser = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const user = await User.findByIdAndDelete(id);
//     res.status(200).json({ ok: true, message: 'Usuario eliminado exitosamente', user });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ ok: false, message: 'Error al eliminar el usuario' });
//   }
// };
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    // Buscar y eliminar turnos relacionados con el usuario
    const userTurnos = await Turno.find({ user: userId });
    for (const turno of userTurnos) {
      await Turno.findByIdAndDelete(turno._id);
    }

    // Eliminar el usuario
    const userDelete = await User.findByIdAndDelete(userId);

    res.status(200).json({ message: 'Usuario y turnos asociados eliminados exitosamente', userDelete });
  } catch (error) {
    console.error(error);
    res.status(500).json('Error al eliminar el usuario y sus turnos asociados');
  }
}


const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      res.status(400).json({ ok: false, message: 'Usuario no encontrado' });
      return;
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      res.status(400).json({ ok: false, message: 'Contraseña incorrecta' });
      return;
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET_KEY);
    res.status(200).json({ ok: true, message: 'Usuario autenticado exitosamente', token, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, message: 'Error al autenticar el usuario' });
  }
};

const getAuthUser = async (req, res) => {
  try {
    const user = await User.findById(req.id);
    if (!user) {
      res.status(404).json({ ok: false, message: "Usuario no encontrado" });
      return;
    }
    res.status(200).json({ ok: true, message: "Usuario encontrado", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, message: "Error al obtener el usuario autenticado" });
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
  getAuthUser,
};
