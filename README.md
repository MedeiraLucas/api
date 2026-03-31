# 🚀 API RESTful - Node.js + MySQL

## 📌 Sobre o projeto
Esta API foi desenvolvida com o objetivo de praticar conceitos de desenvolvimento backend, simulando um ambiente real de aplicação.

O projeto implementa uma API RESTful completa, com autenticação de usuários, gerenciamento de dados e integração com banco de dados MySQL.

---

## 🛠️ Tecnologias utilizadas

- Node.js
- Express
- MySQL
- Sequelize (ORM)
- JWT (Autenticação)
- Bcrypt (Criptografia de senha)
- Swagger (Documentação da API)

---

## ⚙️ Funcionalidades

- 🔐 Cadastro e login de usuários
- 🔑 Autenticação com JWT
- 👤 CRUD de usuários
- 📦 CRUD de produtos
- 🧾 CRUD de pedidos
- 🔗 Relacionamento entre entidades (usuários, pedidos e produtos)
- 📄 Documentação interativa com Swagger

---

## 🧱 Estrutura do projeto

```bash
src/
├── config/        # Configuração do banco de dados
├── controllers/   # Lógica das requisições
├── models/        # Modelos do Sequelize
├── routes/        # Rotas da aplicação
├── middlewares/   # Autenticação e validações
├── docs/          # Swagger
├── app.js         # Configuração do Express
└── server.js      # Inicialização do servidor
