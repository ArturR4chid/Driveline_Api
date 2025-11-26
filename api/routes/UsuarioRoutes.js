const express = require('express');
const Usuario = require('../models/Usuario'); 
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({
      error: 'Erro ao listar usuários',
      details: error.message
    });
  }
});

router.post('/', async (req, res) => {
  try {
    const { nome, email, senha, telefone, tipo, empresa_id } = req.body;
    
    // Validar campos obrigatórios
    if (!nome || !email || !senha) {
      return res.status(400).json({
        error: 'Campos obrigatórios faltando',
        required: ['nome', 'email', 'senha'],
        received: { nome, email, senha }
      });
    }
    
    const usuario = await Usuario.create({
      nome,
      email,
      senha,
      telefone,
      tipo: tipo || 'usuario',
      empresa_id
    });
    res.status(201).json({
      message: 'Usuário cadastrado com sucesso',
      usuario
    });
  } catch (error) {
    res.status(500).json({
      error: 'Erro ao cadastrar usuário',
      details: error.message
    });
  }
});

// ⚠️ IMPORTANTE: /login DEVE VIR ANTES DE /:id
router.post('/login', async (req, res) => {
  try {
    const { email, senha } = req.body;
    
    if (!email || !senha) {
      return res.status(400).json({
        error: 'Email e senha são obrigatórios'
      });
    }
    
    const user = await Usuario.findOne({ email, senha });
    if (user) {
      res.json({
        message: 'Login realizado com sucesso',
        usuario: user
      });
    } else {
      res.status(401).json({
        error: 'Credenciais inválidas'
      });
    }
  } catch (error) {
    res.status(500).json({
      error: 'Erro ao fazer login',
      details: error.message
    });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id);
    if (usuario) {
      res.json(usuario);
    } else {
      res.status(404).json({ error: 'Usuário não encontrado' });
    }
  } catch (error) {
    res.status(500).json({
      error: 'Erro ao obter usuário',
      details: error.message
    });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { nome, email, telefone, tipo, empresa_id } = req.body;
    
    const usuario = await Usuario.update(req.params.id, {
      nome,
      email,
      telefone,
      tipo,
      empresa_id
    });
    
    if (usuario) {
      res.json({
        message: 'Usuário atualizado com sucesso',
        usuario
      });
    } else {
      res.status(404).json({ error: 'Usuário não encontrado' });
    }
  } catch (error) {
    res.status(500).json({
      error: 'Erro ao atualizar usuário',
      details: error.message
    });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const resultado = await Usuario.delete(req.params.id);
    if (resultado) {
      res.json({ message: 'Usuário deletado com sucesso' });
    } else {
      res.status(404).json({ error: 'Usuário não encontrado' });
    }
  } catch (error) {
    res.status(500).json({
      error: 'Erro ao deletar usuário',
      details: error.message
    });
  }
});

module.exports = router;