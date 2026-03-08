require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const usuarioRoutes = require('./routes/usuario.routes');

const app = express();

// Permite a comunicação com front-end de forma tranquila.
app.use(cors());

// Faz o Express entender JSON no corpo das requisições.
app.use(express.json());

// Rota inicial só para mostrar que a API está online.
app.get('/', (req, res) => {
  res.status(200).json({
    mensagem: 'API de usuários funcionando normalmente 🚀'
  });
});

// Rotas do módulo de usuários.
app.use('/api/usuarios', usuarioRoutes);

// Caso a rota não exista, cai aqui.
app.use((req, res) => {
  res.status(404).json({
    erro: 'Rota não encontrada.'
  });
});

const PORT = process.env.PORT || 3000;

async function iniciarServidor() {
  try {
    // Testa a conexão com o banco.
    await sequelize.authenticate();
    console.log('Conexão com o banco realizada com sucesso.');

    // Cria as tabelas se ainda não existirem.
    await sequelize.sync();
    console.log('Tabelas sincronizadas com sucesso.');

    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.error('Erro ao iniciar o servidor:', error.message);
  }
}

iniciarServidor();
