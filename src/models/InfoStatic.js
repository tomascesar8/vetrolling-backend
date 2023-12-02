const {Schema, model} = require('mongoose');

// Modelo para Información Estática
const informacionEstaticaSchema = new mongoose.Schema({
  tipo: String, // Puede ser 'planes', 'productos', 'servicios', 'comentarios', 'nosotros', etc.
  contenido: {
    type: String,
    trim: true,
  }
});


//* En el controlador o ruta para obtener información estática
// const obtenerInformacionEstatica = async (req, res) => {
//   try {
//     const tipoInformacion = req.params.tipo; // Por ejemplo, 'planes'
//     const informacion = await InformacionEstatica.findOne({ tipo: tipoInformacion });
//     res.json(informacion);
//   } catch (error) {
//     res.status(500).json({ error: 'Error al obtener la información estática' });
//   }
// };
