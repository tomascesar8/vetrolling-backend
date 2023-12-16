const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
  nombre: {
    type: String,
    trim: true,
    minlength: 3,
    maxlength: 50,
    required: true
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true, // Add the required property
    minlength: 3,
    maxlength: 60,
    trim: true
  },
  pets: {
    type: [Schema.Types.ObjectId],
    ref: 'Pet'
  }
});

module.exports = model('User', UserSchema);

// turnos: {
//   type: [Schema.Types.ObjectId],
//   ref: 'Turno'
// }