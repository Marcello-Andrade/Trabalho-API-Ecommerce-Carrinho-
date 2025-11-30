module.exports = (err, req, res, next) => {
  console.error(err);
  if (err && err.status) return res.status(err.status).json({ message: err.message });
  res.status(500).json({ message: 'Erro interno no servidor' });
};
