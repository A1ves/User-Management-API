import { register, login, listUsers } from '../controllers/authController.js';
import { verifyJWT } from '../utils/jwt.js';

export default async function (fastify) {
    fastify.post('/api/auth/register', register);
    fastify.post('/api/auth/login', login);
    fastify.get('/api/auth/users', { preHandler: verifyJWT }, listUsers);
}
