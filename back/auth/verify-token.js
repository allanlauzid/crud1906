
const jwt = require('jsonwebtoken');

module.exports = function verifyJWT(req, res, next) {
  const token = req.cookies.token || '';

  if (!token) {
    return res.status(403).send({ error: 'Token não fornecido' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).send({ error: 'Token inválido' });
  }
};
