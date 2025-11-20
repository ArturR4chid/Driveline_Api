const express = require('express');
const Usuario = require('../models/Usuario');
const router = express.Router();

router.get('/', async (req, res) => {
  const usuarios = await Usuario.findAll();
  res.json(usuarios);
});

router.post('/', async (req, res) => {
  const { nome, email, senha } = req.body;
  await Usuario.create({ nome, email, senha });
  res.send('Usuário cadastrado');
});

router.post('/login', async (req, res) => {
  const { email, senha } = req.body;
  const user = await Usuario.findOne({ where: { email, senha } });
  if (user) res.json(user);
  else res.status(401).send('Credenciais inválidas');
});

module.exports = router;