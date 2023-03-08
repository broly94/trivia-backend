import { UserEntity, UserRole } from "../../entities/user.entitiy";
import { BaseServices } from "../../config/base.services";
import { RankEntity } from "../../entities/rank.entity";
import config from "../../config/config";

import jwt from 'jsonwebtoken'


export class UserService extends BaseServices {

    public verificationLiink: string = `http://localhost:${config.port}`



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

    async forgotPassword(email: string) {

        const message = "Check the link in your email"

        const user = await (await this.managerEntity()).findOne(UserEntity, { where: { email } })
        const secret = config.jwtSecret
        const token = jwt.sign({ user: user!.name, email: user!.email }, secret, { expiresIn: '24h' })
        const link = `${this.verificationLiink}/${token}`
        await (await this.managerEntity()).update(UserEntity, user!.id, { resetTokenPassword: token })
        return {message, link}
        // Enviar email para cambiar la password
        
    }
    
    async createNewPassword(newPassword: string, resetToken: string){

        const message = "Password changed successfully"
        const user = await (await this.managerEntity()).findOne(UserEntity, { where: { resetTokenPassword: resetToken } })

        const newPasswordHash = this.userEntity.hashPassword(newPassword)
        await (await this.managerEntity()).update(UserEntity, user!.id, { password: newPasswordHash })

        return message
    }
}