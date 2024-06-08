import { createRequire } from 'module';
const require = createRequire(import.meta.url);
require('dotenv').config();

export const config = {
    secretKey: process.env.SECRET_KEY
};
