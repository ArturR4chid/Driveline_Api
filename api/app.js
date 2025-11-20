const express = require('express');
const cors = require('cors');
const db = require('./db');
const usuarioRoutes = require('./routes/UsuarioRoutes');
const empresaRoutes = require('./routes/EmpresaRoutes');
const veiculoRoutes = require('./routes/VeiculoRoutes');

const app = express();
app.use(express.json());
app.use(cors());

app.use('/usuarios', usuarioRoutes);
app.use('/empresas', empresaRoutes);
app.use('/veiculos', veiculoRoutes);

db.sync().then(() => {
  app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
  });
});