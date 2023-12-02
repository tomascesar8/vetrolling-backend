const { Schema, model } = require('mongoose');

const AdminSchema = new Schema({
  email: {
    type: String,
    trim: true,
    lowercase: true,
    required: true
  },
  password: {
    type: String,
    required: true // Add the required property
  }
  },{
  timestamps: true,
  }
);

// ,
//   role: {
//     type: String,
//     enum: ['user', 'admin'],
//     default: 'user',
//   }
// ,
//   turnos: [{
//     type: mongoose.Schema.Types.ObjectId, 
//     ref: 'Turno' 
//   }],

module.exports = model('Admin', AdminSchema);