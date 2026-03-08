const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

// Cadastra um novo usuário.
async function cadastrar(req, res) {
  try {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
      return res.status(400).json({
        erro: 'Nome, email e senha são obrigatórios.'
      });
    }

    const usuarioExistente = await Usuario.findOne({ where: { email } });

    if (usuarioExistente) {
      return res.status(409).json({
        erro: 'Já existe um usuário cadastrado com esse e-mail.'
      });
    }

    // Criptografa a senha antes de salvar.
    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const novoUsuario = await Usuario.create({
      nome,
      email,
      senha: senhaCriptografada
    });

    return res.status(201).json({
      mensagem: 'Usuário cadastrado com sucesso.',
      usuario: {
        id: novoUsuario.id,
        nome: novoUsuario.nome,
        email: novoUsuario.email
      }
    });
  } catch (error) {
    return res.status(500).json({
      erro: 'Erro interno ao cadastrar usuário.',
      detalhes: error.message
    });
  }
}

// Faz login e devolve um token JWT.
async function login(req, res) {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({
        erro: 'Email e senha são obrigatórios.'
      });
    }

    const usuario = await Usuario.findOne({ where: { email } });

    if (!usuario) {
      return res.status(401).json({
        erro: 'Email ou senha inválidos.'
      });
    }

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

    if (!senhaCorreta) {
      return res.status(401).json({
        erro: 'Email ou senha inválidos.'
      });
    }

    const token = jwt.sign(
      { id: usuario.id, email: usuario.email },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    return res.status(200).json({
      mensagem: 'Login realizado com sucesso.',
      token,
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email
      }
    });
  } catch (error) {
    return res.status(500).json({
      erro: 'Erro interno ao realizar login.',
      detalhes: error.message
    });
  }
}

// Lista todos os usuários sem expor as senhas.
async function listar(req, res) {
  try {
    const usuarios = await Usuario.findAll({
      attributes: ['id', 'nome', 'email', 'createdAt', 'updatedAt']
    });

    return res.status(200).json(usuarios);
  } catch (error) {
    return res.status(500).json({
      erro: 'Erro ao listar usuários.',
      detalhes: error.message
    });
  }
}

// Busca um usuário pelo ID.
async function buscarPorId(req, res) {
  try {
    const { id } = req.params;

    const usuario = await Usuario.findByPk(id, {
      attributes: ['id', 'nome', 'email', 'createdAt', 'updatedAt']
    });

    if (!usuario) {
      return res.status(404).json({
        erro: 'Usuário não encontrado.'
      });
    }

    return res.status(200).json(usuario);
  } catch (error) {
    return res.status(500).json({
      erro: 'Erro ao buscar usuário.',
      detalhes: error.message
    });
  }
}

// Atualiza nome e email do usuário.
async function atualizar(req, res) {
  try {
    const { id } = req.params;
    const { nome, email } = req.body;

    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
      return res.status(404).json({
        erro: 'Usuário não encontrado.'
      });
    }

    if (email && email !== usuario.email) {
      const emailEmUso = await Usuario.findOne({ where: { email } });

      if (emailEmUso) {
        return res.status(409).json({
          erro: 'Esse e-mail já está sendo usado por outro usuário.'
        });
      }
    }

    usuario.nome = nome ?? usuario.nome;
    usuario.email = email ?? usuario.email;

    await usuario.save();

    return res.status(200).json({
      mensagem: 'Usuário atualizado com sucesso.',
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email
      }
    });
  } catch (error) {
    return res.status(500).json({
      erro: 'Erro ao atualizar usuário.',
      detalhes: error.message
    });
  }
}

// Remove um usuário pelo ID.
async function remover(req, res) {
  try {
    const { id } = req.params;

    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
      return res.status(404).json({
        erro: 'Usuário não encontrado.'
      });
    }

    await usuario.destroy();

    return res.status(200).json({
      mensagem: 'Usuário removido com sucesso.'
    });
  } catch (error) {
    return res.status(500).json({
      erro: 'Erro ao remover usuário.',
      detalhes: error.message
    });
  }
}

module.exports = {
  cadastrar,
  login,
  listar,
  buscarPorId,
  atualizar,
  remover
};
