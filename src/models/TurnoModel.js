const { Schema, model } = require('mongoose');

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

module.exports = model('Turno', TurnoSchema);