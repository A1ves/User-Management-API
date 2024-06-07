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

    list(){

    }

    update(user, password){

    }

    delete(user, password){

    }
}