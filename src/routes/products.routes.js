const { Router } = require('express');
const { body } = require('express-validator');
const productsController = require('../controllers/products.controller');
const auth = require('../middlewares/auth.middleware');

const router = Router();

router.post('/', auth, [
  body('nome').isString().notEmpty(),
  body('preco').isFloat({ gt: 0 }),
  body('categoriaId').isString().notEmpty(),
  body('estoque').isInt({ min: 0 })
], productsController.create);

router.get('/', productsController.getAll);
router.get('/:id', productsController.getById);
router.put('/:id', auth, productsController.update);
router.delete('/:id', auth, productsController.remove);

module.exports = router;
