const express = require('express');
const Empresa = require('../models/Empresa');
const router = express.Router();

router.get('/', async (req, res) => {
  const empresas = await Empresa.findAll();
  res.json(empresas);
});

router.post('/', async (req, res) => {
  const { nome, cnpj, endereco } = req.body;
  await Empresa.create({ nome, cnpj, endereco });
  res.send('Empresa cadastrada');
});

module.exports = router;