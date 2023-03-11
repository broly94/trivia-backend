import { UserEntity, UserRole } from "../../entities/user.entitiy";
import { RankEntity } from "../../entities/rank.entity";
import config from "../../config/config";

import jwt from 'jsonwebtoken'
import { myDataSource } from "../../config/configServer";
import transporter from '../../shared/email/transporter'

export class UserService {

    public verificationLiinkEmail: string = `http://${config.init.host}:${config.init.port}`

    public userEntity: UserEntity = new UserEntity()

    public userRepository = myDataSource.getRepository(UserEntity)

    public rankRepository = myDataSource.getRepository(RankEntity)

    async getAllUsers(): Promise<UserEntity[]> {

        return await this.userRepository.find()
    }

    async registerUser(name: string, email: string, password: string) {

        const passwordHash = this.userEntity.hashPassword(password)

        const user = this.userRepository.create({ name, email, password: passwordHash })

        await this.userRepository.save(user)
        
    }

    async getOneUser(id: string): Promise<UserEntity | null> {
        const idUser = Number(id)
        return this.userRepository.findOne({ where: { id: idUser } })
    }

    async changeDataUser(id: number, name: string,) {
        return await this.userRepository.update({ id }, { name })
    }

    async eliminateUser(id: number) {
        await this.rankRepository.delete({ user_id: id })
        await this.userRepository.delete({ id: id })
    }

    /** Forgot Password */

    async forgotPassword(email: string) {

        const messageSuccess = "Check the link in your email"

        const messageError = "The user not found"

        const user = await this.userRepository.findOne({ where: { email } })

        if (user === null) return { messageError }

        const token = jwt.sign({ id: user!.id, user: user!.name, email: user!.email }, config.jwt.jwtSecret, { expiresIn: '24h' })

        const link = `${this.verificationLiinkEmail}/new-password/${token}`

        await this.userRepository.update(user!.id, { resetTokenPassword: token })

        // Enviar email para cambiar la password
        await transporter.sendMail({
            from: '"Recuperar contraseña 👻" <leonel.carro94@gmail.com>', // sender address
            to: user.email, // list of receivers
            subject: "Recuperar contraseña  ✔", // Subject line
            html: `
                <b>Perdió su contraseña?</b>
                <a href="${link}" target="_blank">Haga click aqui para cambiarla</a>
            `, // html body
        });

        return { messageSuccess, link }

    }

    async createNewForgotPassword(newPassword: string, resetToken: string) {

        const user = await this.userRepository.findOne({ where: { resetTokenPassword: resetToken } })

        const newPasswordHash = this.userEntity.hashPassword(newPassword)

        return await this.userRepository.update({ id: user!.id }, { password: newPasswordHash })

    }
}