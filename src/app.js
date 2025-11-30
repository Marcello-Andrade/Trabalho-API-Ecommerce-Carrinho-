const express = require('express');
const routes = require('./routes');
const errorMiddleware = require('./middlewares/error.middleware');

const app = express();
app.use(express.json());

app.use('/api', routes);

app.get('/', (req, res) => res.json({ ok: true, msg: 'API em memória - loja' }));

app.use(errorMiddleware);

module.exports = app;
