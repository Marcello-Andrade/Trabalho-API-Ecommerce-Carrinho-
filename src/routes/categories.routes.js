const { Router } = require('express');
const { body } = require('express-validator');
const categoriesController = require('../controllers/categories.controller');
const auth = require('../middlewares/auth.middleware');

const router = Router();

router.post('/', auth, [
  body('nome').isString().notEmpty(),
  body('descricao').optional().isString()
], categoriesController.create);

router.get('/', categoriesController.getAll);
router.get('/:id', categoriesController.getById);
router.put('/:id', auth, categoriesController.update);
router.delete('/:id', auth, categoriesController.remove);

module.exports = router;
