const { Schema, model } = require('mongoose');

//! turnos en ingles: appointments 

const TurnoSchema = new Schema({
  detalleCita: {
    type: String,
    trim: true,
  }
  pet: { 
    type: Schema.Types.ObjectId, 
    ref: 'Pet' 
  },
  fecha: Date,
  hora: String,
});

//? turno al dueño o al la mascota?

// ,
// veterinario: {
//   mongoose.Schema.Types.ObjectId, 
//   ref: 'Veterinario'
// }

module.exports = model('Turno', TurnoSchema);