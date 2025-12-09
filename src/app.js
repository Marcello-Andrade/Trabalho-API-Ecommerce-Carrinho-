const express = require('express');
const cors = require('cors');
const errorMiddleware = require('./middlewares/error.middleware');

const authRoutes = require('./routes/auth.routes');
const categoriesRoutes = require('./routes/categories.routes');
const productsRoutes = require('./routes/products.routes');
const cartsRoutes = require('./routes/carts.routes');
const customersRoutes = require('./routes/customers.routes');

const app = express();

app.use(cors());
app.use(express.json());

// PREFIXOS DAS ROTAS (TODOS começam com /api)
app.use('/api/auth', authRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/carts', cartsRoutes);
app.use('/api/customers', customersRoutes);

// ROTA BASE
app.get('/', (req, res) => {
  res.json({ ok: true, msg: 'API em memória - loja funcionando 🚀' });
});

// MIDDLEWARE GLOBAL DE ERROS
app.use(errorMiddleware);

module.exports = app;
