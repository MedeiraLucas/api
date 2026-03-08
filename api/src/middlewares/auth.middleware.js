const jwt = require('jsonwebtoken');

function verificarToken(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        erro: 'Token não informado.'
      });
    }

    // Espera um header no formato: Bearer token_aqui
    const [, token] = authHeader.split(' ');

    if (!token) {
      return res.status(401).json({
        erro: 'Token inválido.'
      });
    }

    const dadosToken = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = dadosToken;

    next();
  } catch (error) {
    return res.status(401).json({
      erro: 'Token expirado ou inválido.',
      detalhes: error.message
    });
  }
}

module.exports = verificarToken;
