import { UserEntity, UserRole } from "../../entities/user.entitiy";
import { RankEntity } from "../../entities/rank.entity";
import config from "../../config/config";

import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

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

    async setNewPassword(password: string, newPassword: string, userLoggin: any) {

        //Certificamos que estamos logeados
        if(userLoggin == null) return 

        //Obtenemos el usuario logeado para acceder a su password
        const user = await this.userRepository.findOne({ where: { id: userLoggin.id } })

        //Comparamos la password ingresada con la password de la db
        const passwordsAreSame = await bcrypt.compare(password, user!!.password)

        if(!passwordsAreSame) return

        //Hasheamos la nueva password
        const passwordHash = this.userEntity.hashPassword(newPassword)

        //Actualiza el usuario con la password nueva y lo retorna
        return await this.userRepository.update({ id: userLoggin!.id }, { password: passwordHash })

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
            from: '"Recuperar contrase??a ????" <leonel.carro94@gmail.com>', // sender address
            to: user.email, // list of receivers
            subject: "Recuperar contrase??a  ???", // Subject line
            html: `
                <b>Perdi?? su contrase??a?</b>
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