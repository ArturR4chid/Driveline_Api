const express = require('express');
const Veiculo = require('../models/Veiculo');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const veiculos = await Veiculo.findAll();
    res.json(veiculos);
  } catch (error) {
    res.status(500).json({
      error: 'Erro ao listar veículos',
      details: error.message
    });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const veiculo = await Veiculo.findById(req.params.id);
    if (veiculo) {
      res.json(veiculo);
    } else {
      res.status(404).json({ error: 'Veículo não encontrado' });
    }
  } catch (error) {
    res.status(500).json({
      error: 'Erro ao obter veículo',
      details: error.message
    });
  }
});

router.post('/', async (req, res) => {
  try {
    const { marca, modelo, ano, placa, quilometragem, proprietario_id } = req.body;
    
    if (!marca || !modelo || !ano || !placa || !proprietario_id) {
      return res.status(400).json({
        error: 'Campos obrigatórios faltando',
        required: ['marca', 'modelo', 'ano', 'placa', 'proprietario_id'],
        received: { marca, modelo, ano, placa, proprietario_id }
      });
    }
    
    const veiculo = await Veiculo.create({
      marca,
      modelo,
      ano,
      placa,
      quilometragem,
      proprietario_id
    });
    
    res.status(201).json({
      message: 'Veículo cadastrado com sucesso',
      veiculo
    });
  } catch (error) {
    res.status(500).json({
      error: 'Erro ao cadastrar veículo',
      details: error.message
    });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { marca, modelo, ano, quilometragem } = req.body;
    
    const veiculo = await Veiculo.update(req.params.id, {
      marca,
      modelo,
      ano,
      quilometragem
    });
    
    if (veiculo) {
      res.json({
        message: 'Veículo atualizado com sucesso',
        veiculo
      });
    } else {
      res.status(404).json({ error: 'Veículo não encontrado' });
    }
  } catch (error) {
    res.status(500).json({
      error: 'Erro ao atualizar veículo',
      details: error.message
    });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const resultado = await Veiculo.delete(req.params.id);
    if (resultado) {
      res.json({ message: 'Veículo deletado com sucesso' });
    } else {
      res.status(404).json({ error: 'Veículo não encontrado' });
    }
  } catch (error) {
    res.status(500).json({
      error: 'Erro ao deletar veículo',
      details: error.message
    });
  }
});

module.exports = router;