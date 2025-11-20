const express = require('express');
const Veiculo = require('../models/Veiculo');
const router = express.Router();

router.get('/', async (req, res) => {
  const veiculos = await Veiculo.findAll();
  res.json(veiculos);
});

router.post('/', async (req, res) => {
  const { modelo, placa, empresa_id } = req.body;
  await Veiculo.create({ modelo, placa, empresa_id });
  res.send('Veículo cadastrado');
});

module.exports = router;