import { fastify } from 'fastify'
import { DatabaseMemoryUser } from './database-memory.js'

const server = fastify()
const database = new DatabaseMemoryUser()

server.post('/api/auth/register', (request, reply) => {
    const { name, email, password } = request.body

    if( !name || !email || !password ){
        return reply.status(400).send({ error: 'Username, e-mail and password are required' })
    }

    database.create({
        name,
        email,
        password
    })

    return reply.status(201).send()

})

server.post('/api/auth/login', (request, reply) => {
    const { email, password} = request.body

    const ID = database.login({ email, password })

    if(ID){
        return reply.status(201).send({ message: 'Login successful' })
    } else {
        return reply.status(401).send({ error: 'Invalid username or password' });
    }
})

server.get('/api/auth/users', (request, reply) => {
    return reply.status(200).send(database.list())
})


server.listen({
    port:3333
})