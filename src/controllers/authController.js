import { registerUser, loginUser, listAllUsers } from '../services/authService.js';

export const register = async (request, reply) => {
    const { name, email, password } = request.body;

    if (!name || !email || !password) {
        return reply.status(400).send({ error: 'Username, e-mail and password are required' });
    }

    try {
        await registerUser(name, email, password);
        return reply.status(201).send();
    } catch (error) {
        console.error('Erro ao registrar usuário:', error);
        return reply.status(500).send({ error: 'Internal Server Error' });
    }
};

export const login = async (request, reply) => {
    const { email, password } = request.body;

    try {
        const token = await loginUser(email, password);
        return reply.status(201).send({ auth: true, token });
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        return reply.status(401).send({ error: 'Invalid username or password' });
    }
};

export const listUsers = async (request, reply) => {
    try {
        const users = await listAllUsers();
        return reply.status(200).send(users);
    } catch (error) {
        console.error('Erro ao listar usuários:', error);
        return reply.status(500).send({ error: 'Internal Server Error' });
    }
};
