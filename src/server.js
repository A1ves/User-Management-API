import fastify from 'fastify';
import { config } from './config/index.js';
import authRoutes from './routes/authRoutes.js';

const server = fastify();

server.register(authRoutes);

server.listen({ port: 3333 }, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server listening at ${address}`);
});
