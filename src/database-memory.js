import { randomUUID } from "crypto"

export class DatabaseMemoryUser {
    #users = new Map()

    create(user){
        const userID= randomUUID()
        this.#users.set(userID, user)
    }

    login({email, password}){
        for(let [userID, user] of this.#users){
            if(user.email === email && user.password === password){
                return userID
            }
        }
        return null
    }

    findUserByEmail(email) {
        for (let user of this.#users.values()) {
          if (user.email === email) {
            return user;
          }
        }
        return null;
    }

    list(){
        return Array.from(this.#users.entries()).map((eventArray) => {
            const id = eventArray[0]
            const data = eventArray[1]

            return {
                id,
                ...data,
            }
        })
    }

    update(user, password){

    }

    delete(user, password){

    }
}