const db = require('../config/db');
exports.getAll = (req, res) => 
    { db.query('SELECT * FROM usuarios', (err, results) => { if (err) return res.status(500).send(err); res.json(results); }); };
exports.getById = (req, res) => 
    { const { id } = req.params; db.query('SELECT * FROM usuarios WHERE id = ?', [id], (err, results) => { if (err) return res.status(500).send(err); res.json(results[0]); }); };
exports.create = (req, res) =>
     { const { nome, email, senha } = req.body; db.query('INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)', [nome, email, senha], (err, result) => { if (err) return res.status(500).send(err); res.json({ message: 'Usuário criado com sucesso!', id: result.insertId }); }); };
exports.update = (req, res) =>
     { const { id } = req.params; const { nome, email, senha } = req.body; db.query('UPDATE usuarios SET nome=?, email=?, senha=? WHERE id=?', [nome, email, senha, id], (err) => { if (err) return res.status(500).send(err); res.json({ message: 'Usuário atualizado com sucesso!' }); }); };
exports.delete = (req, res) => 
    { const { id } = req.params; db.query('DELETE FROM usuarios WHERE id=?', [id], (err) => { if (err) return res.status(500).send(err); res.json({ message: 'Usuário deletado com sucesso!' }); }); };
exports.login = (req, res) => { const { email, senha } = req.body; db.query('SELECT * FROM usuarios WHERE email=? AND senha=?', [email, senha], (err, results) => { if (err) return res.status(500).send(err); if (results.length > 0) res.json({ message: 'Login bem-sucedido', usuario: results[0] }); else res.status(401).json({ message: 'Credenciais inválidas' }); }); };