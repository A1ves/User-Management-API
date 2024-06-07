# User Management API

## Descrição
Este projeto é uma API de Cadastro de Usuários que fornece operações completas de CRUD (Create, Read, Update, Delete) para gerenciar usuários. A API foi desenvolvida utilizando Node.js com o framework Express e banco de dados PostgreSQL. As funcionalidades incluem validação de dados, autenticação JWT e encriptação de senhas com bcrypt.

## Tecnologias Utilizadas
- Node.js
- Express
- PostgreSQL
- JWT (JSON Web Token)
- bcrypt

## Funcionalidades
- **Cadastro de Usuários:** Permite criar um novo usuário com validação de dados.
- **Leitura de Usuários:** Permite obter informações de usuários específicos ou de todos os usuários.
- **Atualização de Usuários:** Permite atualizar informações de um usuário específico.
- **Exclusão de Usuários:** Permite deletar um usuário específico.
- **Autenticação:** Implementa autenticação utilizando JWT.
- **Segurança:** Encriptação de senhas utilizando bcrypt.

## Requisitos
- Node.js
- PostgreSQL

## Instalação
1. Clone o repositório:
    ```bash
    git clone https://github.com/seu-usuario/user-management-api.git
    ```
2. Navegue até o diretório do projeto:
    ```bash
    cd user-management-api
    ```
3. Instale as dependências:
    ```bash
    npm install
    ```

## Configuração
1. Crie um banco de dados PostgreSQL e configure o arquivo `.env` com as informações do banco de dados:
    ```
    DB_HOST=localhost
    DB_USER=seu-usuario
    DB_PASSWORD=sua-senha
    DB_NAME=nome-do-banco
    JWT_SECRET=sua-chave-secreta
    ```

2. Execute as migrações para criar as tabelas no banco de dados:
    ```bash
    npx sequelize-cli db:migrate
    ```

## Execução
1. Inicie o servidor:
    ```bash
    npm start
    ```

2. A API estará disponível em `http://localhost:3000`.

## Endpoints
### Autenticação
- **POST /api/auth/register**: Cadastro de novo usuário.
- **POST /api/auth/login**: Login de usuário e obtenção de token JWT.

### Usuários
- **GET /api/users**: Obter todos os usuários.
- **GET /api/users/:id**: Obter um usuário específico.
- **PUT /api/users/:id**: Atualizar um usuário específico.
- **DELETE /api/users/:id**: Deletar um usuário específico.

## Exemplos de Uso

### Cadastro de Usuário
```bash
curl -X POST http://localhost:3000/api/auth/register \
-H "Content-Type: application/json" \
-d '{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "senha123"
}'
```

### Login de Usuário
```bash
curl -X POST http://localhost:3000/api/auth/login \
-H "Content-Type: application/json" \
-d '{
  "email": "john.doe@example.com",
  "password": "senha123"
}'
```

### Obter Todos os Usuários
```bash
curl -X GET http://localhost:3000/api/users \
-H "Authorization: Bearer {seu-token-jwt}"
```