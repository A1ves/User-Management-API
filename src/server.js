import { fastify } from 'fastify'
import { DatabaseMemoryUser } from './database-memory.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

import { createRequire } from 'module'
import { hash } from 'crypto'
const require = createRequire(import.meta.url)
require('dotenv').config()

const secretKey = process.env.SECRET_KEY
const server = fastify()
const database = new DatabaseMemoryUser()


server.post('/api/auth/register', async (request, reply) => {
    const { name, email, password } = request.body

    if( !name || !email || !password ){
        return reply.status(400).send({ error: 'Username, e-mail and password are required' })
    }

    try {
        const pass = password;
    
        // Criptografar a senha
        const hash = await criptografarSenha(pass);
        console.log('Senha criptografada:', hash);
    
        // Criar o usuário no banco de dados
        database.create({
          name,
          email,
          password: hash // Armazenar o hash da senha no banco de dados
        });
    
        return reply.status(201).send();
      } catch (error) {
        console.error('Erro ao registrar usuário:', error);
        return reply.status(500).send({ error: 'Internal Server Error' });
      }

})

server.post('/api/auth/login', async (request, reply) => {
    const { email, password} = request.body

    const user = database.findUserByEmail(email);

    if (user) {
      const validPassword = await verificarSenha(password, user.password);
      if (validPassword) {
        const ID = user.id;
        const token = jwt.sign({ ID }, secretKey, { expiresIn: 300 });
        return reply.status(201).send({ auth: true, token });
      } else {
        return reply.status(401).send({ error: 'Invalid password' });
      }
    } else {
      return reply.status(401).send({ error: 'Invalid username or password' });
    }
})

server.get('/api/auth/users', {
    preHandler: verifyJWT,
    handler: async (request, reply) => {
        return reply.status(200).send(database.list())
    }
})

function verifyJWT(request, reply, done){
    const token = request.headers['x-acess-token']
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return reply.status(401).send({ error: 'Unauthorized' });
        }

        request.ID = decoded.ID;
        done();
    });
}

async function criptografarSenha(senha) {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(senha, salt);
    return hash;
}

async function verificarSenha(senha, hash) {
    return await bcrypt.compare(senha, hash);
}

server.listen({
    port:3333
})