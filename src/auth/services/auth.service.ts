import { Repository } from "typeorm";
import { UserEntity } from "../../entities/user.entitiy";

export class AuthService {

    constructor(private userRepository: Repository<UserEntity>) { }

    async loginUser(email: string) {
        return await this.userRepository.findOne({ where: { email: email } })
    }
}