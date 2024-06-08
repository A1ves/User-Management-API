import { randomUUID } from 'crypto';

export class DatabaseMemoryUser {
    #users = new Map();

    create(user) {
        const userID = randomUUID();
        this.#users.set(userID, user);
    }

    findUserByEmail(email) {
        for (let user of this.#users.values()) {
            if (user.email === email) {
                return user;
            }
        }
        return null;
    }

    list() {
        return Array.from(this.#users.entries()).map(([id, data]) => ({
            id,
            ...data,
        }));
    }
}
