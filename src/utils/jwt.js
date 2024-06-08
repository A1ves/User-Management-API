import jwt from 'jsonwebtoken';
import { config } from '../config/index.js';

export const generateToken = (id) => {
    return jwt.sign({ ID: id }, config.secretKey, { expiresIn: 300 });
};

export const verifyJWT = (request, reply, done) => {
    const token = request.headers['x-access-token'];
    jwt.verify(token, config.secretKey, (err, decoded) => {
        if (err) {
            return reply.status(401).send({ error: 'Unauthorized' });
        }

        request.ID = decoded.ID;
        done();
    });
};
