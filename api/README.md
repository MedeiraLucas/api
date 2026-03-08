# API RESTful - Cadastro e Login de Usuários

Projeto de exemplo feito com **Node.js**, **Express**, **Sequelize** e **MySQL**.

## Funcionalidades

- Cadastro de usuário
- Login com JWT
- Listagem de usuários
- Busca de usuário por ID
- Atualização de usuário
- Exclusão de usuário
- Middleware de autenticação
- Tratamento de erros

## Tecnologias

- Node.js
- Express
- Sequelize
- MySQL
- JWT
- bcryptjs
- dotenv

## Como executar

### 1. Instalar as dependências

```bash
npm install
```

### 2. Criar o arquivo `.env`

Copie o `.env.example` e renomeie para `.env`.

### 3. Configurar o banco de dados MySQL

Crie um banco chamado:

```sql
CREATE DATABASE api_ads;
```

### 4. Rodar o projeto

```bash
npm run dev
```

ou

```bash
npm start
```

## Rotas principais

### Teste da API
- `GET /`

### Usuários
- `POST /api/usuarios/cadastrar`
- `POST /api/usuarios/login`
- `GET /api/usuarios`
- `GET /api/usuarios/:id`
- `PUT /api/usuarios/:id`
- `DELETE /api/usuarios/:id`

## Exemplo de JSON para cadastro

```json
{
  "nome": "Lucas Medeira",
  "email": "lucas@email.com",
  "senha": "123456"
}
```

## Exemplo de retorno no login

```json
{
  "mensagem": "Login realizado com sucesso.",
  "token": "seu_token_jwt",
  "usuario": {
    "id": 1,
    "nome": "Lucas Medeira",
    "email": "lucas@email.com"
  }
}
```

## Observação

Esse projeto foi estruturado de forma simples e organizada, com comentários mais humanos, como se fosse desenvolvido por um(a) estudante da 5ª fase de ADS.
