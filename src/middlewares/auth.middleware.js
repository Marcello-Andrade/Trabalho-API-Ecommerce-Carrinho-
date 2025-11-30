const jwt = require('jsonwebtoken');
const db = require('../models/db');
const JWT_SECRET = process.env.JWT_SECRET || 'CHANGE_THIS_SECRET';

module.exports = (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) return res.status(401).json({ message: 'Token faltando' });
  const token = auth.split(' ')[1];
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    const user = db.users.find(u => u.id === payload.sub);
    if (!user) return res.status(401).json({ message: 'Usuário inválido' });
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token inválido' });
  }
};
