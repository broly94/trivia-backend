import { myDataSource } from "../../config/configServer";
import { UserEntity } from "../../entities/user.entitiy";

export class AuthService {

    public userRepository = myDataSource.getRepository(UserEntity)

    async LoginUser(email: string) {
        return await this.userRepository.findOne({ where: { email: email } })
    }
}