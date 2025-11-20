const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const usuariosRoutes = require('./routes/usuariosRoutes');
const empresasRoutes = require('./routes/empresasRoutes');
const veiculosRoutes = require('./routes/veiculosRoutes');

app.use('/api/usuarios', usuariosRoutes);
app.use('/api/empresas', empresasRoutes);
app.use('/api/veiculos', veiculosRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
