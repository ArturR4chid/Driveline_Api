const express = require('express');
const Empresa = require('../models/Empresa');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const empresas = await Empresa.findAll();
    res.json(empresas);
  } catch (error) {
    res.status(500).json({
      error: 'Erro ao listar empresas',
      details: error.message
    });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const empresa = await Empresa.findById(req.params.id);
    if (empresa) {
      res.json(empresa);
    } else {
      res.status(404).json({ error: 'Empresa não encontrada' });
    }
  } catch (error) {
    res.status(500).json({
      error: 'Erro ao obter empresa',
      details: error.message
    });
  }
});

router.post('/', async (req, res) => {
  try {
    const { razao_social, nome_fantasia, cnpj, email, telefone, rua, numero, bairro, cidade, estado, cep } = req.body;
    
    if (!razao_social || !cnpj) {
      return res.status(400).json({
        error: 'Campos obrigatórios faltando',
        required: ['razao_social', 'cnpj'],
        received: { razao_social, cnpj }
      });
    }
    
    const empresa = await Empresa.create({
      razao_social,
      nome_fantasia,
      cnpj,
      email,
      telefone,
      rua,
      numero,
      bairro,
      cidade,
      estado,
      cep
    });
    
    res.status(201).json({
      message: 'Empresa cadastrada com sucesso',
      empresa
    });
  } catch (error) {
    res.status(500).json({
      error: 'Erro ao cadastrar empresa',
      details: error.message
    });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { razao_social, nome_fantasia, email, telefone, rua, numero, bairro, cidade, estado, cep } = req.body;
    
    const empresa = await Empresa.update(req.params.id, {
      razao_social,
      nome_fantasia,
      email,
      telefone,
      rua,
      numero,
      bairro,
      cidade,
      estado,
      cep
    });
    
    if (empresa) {
      res.json({
        message: 'Empresa atualizada com sucesso',
        empresa
      });
    } else {
      res.status(404).json({ error: 'Empresa não encontrada' });
    }
  } catch (error) {
    res.status(500).json({
      error: 'Erro ao atualizar empresa',
      details: error.message
    });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const resultado = await Empresa.delete(req.params.id);
    if (resultado) {
      res.json({ message: 'Empresa deletada com sucesso' });
    } else {
      res.status(404).json({ error: 'Empresa não encontrada' });
    }
  } catch (error) {
    res.status(500).json({
      error: 'Erro ao deletar empresa',
      details: error.message
    });
  }
});

module.exports = router;