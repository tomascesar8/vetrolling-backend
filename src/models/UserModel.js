//que es un schema? estructura que define cómo se organizará y almacenará la información en una base de datos

//modelo proporciona una representación conceptual de cómo se relaciona y se accede a la información en la base de datos.

//El schema proporciona una interfaz para trabajar con el modelo de datos, de forma similar a cómo una interfaz de usuario permite interactuar con un sistema.

//EJEMPLO BIBLIOTECA:
//el esquema se encargaría de la estructura general de la biblioteca y las reglas de organización de las secciones temáticas, mientras que el modelo de datos se utilizaría para seleccionar los libros específicos que se colocarían en cada sección en función de su información y características.
const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
  nombre: {
    type: String,
    trim: true,
    minlength: 3,
    maxlength: 50,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    required: true, // Add the required property
  },
  password: {
    type: String,
    required: true, // Add the required property
    minlength: 3,
    maxlength: 50,
    trim: true,
  },
  pets: {
    type: [Schema.Types.ObjectId],
    ref: 'Pet'
  },
});

module.exports = model('User', UserSchema);

//   turnos: [{
//     type: Schema.Types.ObjectId, //? asi o "moongoose.Schema.Types.ObjectId" ?
//     ref: 'Turno'
//   }]

//algo asi sería el route y controller:
// app.post('/users', (req, res) => {
//   const { nombre, email, password, mascotaId } = req.body;

//   const user = new User({
//     nombre,
//     email,
//     password,
//     mascota: mascotaId // Vincula el usuario con la mascota utilizando el identificador de la mascota
//   });

//   user.save()
//     .then(() => {
//       res.status(200).json({ message: 'Usuario creado exitosamente' });
//     })
//     .catch((error) => {
//       res.status(500).json({ error: 'Error al crear el usuario' });
//     });
// });