import { UserEntity } from "../../entities/user.entitiy";
import { ConfigServer } from "../../config/configServer";
import bcrypt from 'bcrypt'

interface IUser {
    id: number,
    createdAt: Date,
    updateAt: Date,
    name: String,
    email: String,
    password: String
}

export class UserService extends ConfigServer {

    protected Connection = this.typeORMConfig().initialize()
    private saltRounds: number = 10
    
    constructor() {
        super();
       
    }
    
    async getAllUsers(): Promise<IUser[]> {
        const userRepository = (await this.Connection).getRepository(UserEntity)
        this.Connection.finally()
        return await userRepository.find()
    }
    
    async registerUser(name: string, email: string, password: string): Promise<void> { 
        const passwordHash = bcrypt.hashSync(password, this.saltRounds);
        (await this.Connection).getRepository(UserEntity).save({ name, email, password: passwordHash })
        this.Connection.finally()
    }

    async getOneUser(id: string): Promise<IUser | null> {
        const idUser = Number(id)
        const userRepository = (await this.Connection).getRepository(UserEntity)
        return await userRepository.findOne({ where: { id: idUser } })
    }

    async LoginUser(email: string) {
        const userRepository = (await this.Connection).getRepository(UserEntity)
        return await userRepository.findOne({ where: { email: email } })
       
    }
}