const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuario.controller');
const verificarToken = require('../middlewares/auth.middleware');

// Rotas públicas
router.post('/cadastrar', usuarioController.cadastrar);
router.post('/login', usuarioController.login);

// Rotas protegidas
router.get('/', verificarToken, usuarioController.listar);
router.get('/:id', verificarToken, usuarioController.buscarPorId);
router.put('/:id', verificarToken, usuarioController.atualizar);
router.delete('/:id', verificarToken, usuarioController.remover);

module.exports = router;
