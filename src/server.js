import { fastify } from 'fastify'
import { DatabaseMemoryUser } from './database-memory.js'
import jwt from 'jsonwebtoken'

const secretKey = 'ayron'
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
        const token = jwt.sign({ID}, secretKey, { expiresIn: 300 })
        // return reply.status(201).send({ message: 'Login successful' }).
        return reply.status(201).send({auth: true, token})
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

server.listen({
    port:3333
})