const jwt = require('jsonwebtoken');

exports.checkToken = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).json({ msg: 'No hay token, ACCESO DENEGADO' });
  }
  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!id) {
      return res.status(401).json({ msg: 'Token inválido' });
    }
    req.id = id;
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ msg: 'Token expirado' });
    }
    console.error(error);
    res.status(500).json({ msg: 'Error en el servidor' });
  }
};

