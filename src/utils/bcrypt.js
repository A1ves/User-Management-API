import bcrypt from 'bcrypt';

export const criptografarSenha = async (senha) => {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(senha, salt);
};

export const verificarSenha = async (senha, hash) => {
    return await bcrypt.compare(senha, hash);
};
