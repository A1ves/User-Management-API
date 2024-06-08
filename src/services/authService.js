import { criptografarSenha, verificarSenha } from '../utils/bcrypt.js';
import { generateToken } from '../utils/jwt.js';
import { DatabaseMemoryUser } from '../database/memoryDatabase.js';

const database = new DatabaseMemoryUser();

export const registerUser = async (name, email, password) => {
    const hash = await criptografarSenha(password);
    database.create({ name, email, password: hash });
};

export const loginUser = async (email, password) => {
    const user = database.findUserByEmail(email);

    if (user) {
        const validPassword = await verificarSenha(password, user.password);
        if (validPassword) {
            return generateToken(user.id);
        } else {
            throw new Error('Invalid password');
        }
    } else {
        throw new Error('Invalid username or password');
    }
};

export const listAllUsers = async () => {
    return database.list();
};
