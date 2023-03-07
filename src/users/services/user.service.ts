import { UserEntity, UserRole } from "../../entities/user.entitiy";
import { BaseServices } from "../../config/base.services";

export class UserService extends BaseServices {


    public userEntity: UserEntity = new UserEntity()
    
    async getAllUsers(): Promise<UserEntity[]> {
        const data = (await this.managerEntity()).find(UserEntity)
        return data
    }

    async registerUser(name: string, email: string, password: string, points?: number, role?: Enumerator<UserRole>) {
        const passwordHash = this.userEntity.hashPassword(password)
        const user = (await this.managerEntity()).insert(UserEntity,{ name, email, password: passwordHash, points, role })
        return user
    }

    async getOneUser(id: string): Promise<UserEntity | null> {
        const idUser = Number(id)
        return (await this.managerEntity()).findOne(UserEntity, { where: { id: idUser } })
    }

    async LoginUser(email: string) {
        const user = (await this.managerEntity()).findOne(UserEntity, { where: { email: email } })
        return user
    }
}