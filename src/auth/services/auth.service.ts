import { BaseServices } from "../../config/base.services";
import { UserEntity } from "../../entities/user.entitiy";

export class AuthService extends BaseServices{

    async LoginUser(email: string) {
        const user = await (await this.managerEntity()).findOne(UserEntity, { where: { email: email } })
        return user
    }
}