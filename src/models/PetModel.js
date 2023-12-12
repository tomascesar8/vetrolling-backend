const { Schema, model } = require('mongoose');

const PetSchema = new Schema({
  nombre:{
    type: String,
    trim: true, 
    minlength: 3,
    maxlength: 50,
  }, 
  especie:{
    type: String,
    trim: true, 
    minlength: 3,
    maxlength: 20
  },
  raza:{
    type: String,
    trim: true, 
    minlength: 3,
    maxlength: 20
  },
  petOwner:{
    type: Schema.Types.ObjectId, 
    ref: 'User' 
  },
  turnos: {
    type: [Schema.Types.ObjectId],
    ref: 'Turno'
  }
}, 
  {
    timestamps: true,
    versionKey: false
})

module.exports = model('Pet', PetSchema);