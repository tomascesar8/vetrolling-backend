const { Schema, model } = require('mongoose');

//! turnos en ingles: appointments 

const TurnoSchema = new Schema({
  detalleCita: {
    type: String,
    trim: true,
  },
  user: { 
    type: Schema.Types.ObjectId, 
    ref: 'User' 
  },
  veterinarian: {
    type: Schema.Types.ObjectId,
    ref: 'Veterinarian',
  },
  fecha: Date,
  hora: String,
},
  {
    timestamps: true,
    versionKey: false
  }
);

//? turno al dueño o al la mascota?

//*ejemplo de como se guardarian los turnos
// {
//   "detalleCita": "Consulta general",
//   "pet": "60f5a7e2e4a2f536f8c6a5b5",
//   "veterinario": "60f5a7e2e4a2f536f8c6a5b6",
//   "fecha": "2021-07-20",
//   "hora": "10:00 AM"
// }

module.exports = model('Turno', TurnoSchema);