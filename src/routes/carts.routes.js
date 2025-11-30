const { Router } = require('express');
const { body } = require('express-validator');
const cartsController = require('../controllers/carts.controller');
const auth = require('../middlewares/auth.middleware');

const router = Router();

router.post('/', [ body('nomeCliente').isString().notEmpty() ], cartsController.create);

router.get('/', cartsController.getAll);

router.get('/:id', cartsController.getById);

router.post('/:id/items', [ body('productId').isString().notEmpty(), body('quantidade').isInt({ min: 1 }) ], cartsController.addItem);

router.delete('/:id/items/:itemId', cartsController.removeItem);

router.post('/:id/confirm', auth, cartsController.confirmCart);

module.exports = router;
