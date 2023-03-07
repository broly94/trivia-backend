import { UserEntity, UserRole } from "../../entities/user.entitiy";
import { BaseServices } from "../../config/base.services";
import { RankEntity } from "../../entities/rank.entity";

export class UserService extends BaseServices {


    public userEntity: UserEntity = new UserEntity()

    async getAllUsers(): Promise<UserEntity[]> {
        return await (await this.managerEntity()).find(UserEntity)
    }

    async registerUser(name: string, email: string, password: string, points?: number, role?: Enumerator<UserRole>) {
        const passwordHash = this.userEntity.hashPassword(password)
        await (await this.managerEntity()).insert(UserEntity, { name, email, password: passwordHash, points, role })
    }

    async getOneUser(id: string): Promise<UserEntity | null> {
        const idUser = Number(id)
        return (await this.managerEntity()).findOne(UserEntity, { where: { id: idUser } })
    }

    async eliminateUser(id: number) {
        await (await this.managerEntity()).delete(RankEntity, { user_id: id })
        await (await this.managerEntity()).delete(UserEntity, { id: id })
    }
}