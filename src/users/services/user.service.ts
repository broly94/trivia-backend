import { Repository } from "typeorm";
import config from "../../config/config"

import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import transporter from '../../shared/email/transporter'

/** Entities */
import { UserEntity } from "../../entities/user.entitiy"

import { v4 as uuidv4 } from 'uuid'

export class UserService {

    constructor(private readonly userEntity: UserEntity, private userRepository: Repository<UserEntity>) { }

    // private linkForSendEmail: string = `${config.init.host_client}`

    /** 
    *    Called by getUsers in controller
    *    This func return all users 
    *    @return Array of users
    */

    async getAllUsers(): Promise<UserEntity[]> {
        return await this.userRepository.find()
    }

    /** 
    *    Called by postUser in controller 
    *    This func create a new user
    *    @param name
    *    @param email
    *    @param password
    *    @return void
    */

    async registerUser(name: string, email: string, password: string) {

        const passwordHash = this.userEntity.hashPassword(password)

        const user = this.userRepository.create({ name, email, password: passwordHash })

        await this.userRepository.save(user)

    }

    /** 
    *    Called by getUser in controller
    *    This func return one user by id 
    *    @param id
    *    @return User | null
    */

    async getOneUser(id: string): Promise<UserEntity | null> {
        const idUser = Number(id)
        return this.userRepository.findOne({ where: { id: idUser } })
    }

    /** 
    *    Called by updateUser in controller
    *    This func update one user by id 
    *    @param id
    *    @param name
    *    @return void
    */

    async changeDataUser(id: number, name: string) {
        return await this.userRepository.update({ id }, { name })
    }

    /** 
    *    Called by deleteUser in controller
    *    This func delete one user by id and delete the user for ranking 
    *    @param id
    *    @return void
    */

    async eliminateUser(id: number) {
        await this.userRepository.delete({ id: id })
    }

    /** 
    *    Called by changePassword in controller
    *    This func change the password of one user 
    *    @param id
    *    @param password
    *    @param newPassword
    *    @param userLoggin
    *    @return User updated
    */

    async setNewPassword(password: string, newPassword: string, userLogin: Express.Request["user"]) {

        const user = await this.userRepository.findOne({ where: { id: userLogin.id } })

        const passwordsAreSame = await bcrypt.compare(password, user!.password)

        if (!passwordsAreSame) return

        const passwordHash = this.userEntity.hashPassword(newPassword)

        return await this.userRepository.update({ id: userLogin.id }, { password: passwordHash })

    }

    /** The functions forgot password */

    /** 
    *    Called by getUsersByPoints in controller
    *    This func return all users by given points
    *    @return Users[]
    */

    async getUsersRank(): Promise<UserEntity[]> {
        return await this.userRepository.find({
            select: {
                name: true,
                points: true
            },
            order: {
                points: 'DESC'
            }
        })
    }


    /** The functions forgot password */

    /** 
    *    Called by sendEmailForgotPassword in controller
    *    This func send email to the user for the password reset 
    *    @param email
    *    @return Object
    */
    async forgotPassword(email: string) {

        const messageSuccess = "Check the link in your email"

        const messageError = "The user not found"

        const user = await this.userRepository.findOne({ where: { email } })

        if (user === null) return { messageError }

        const token = jwt.sign({ id: user!.id, user: user!.name, email: user!.email }, config.jwt.jwtSecret, { expiresIn: '1h' })

        const url_random = uuidv4()

        const link = `${config.init.host_client}/new-password/${url_random}/?token=${token}`

        await this.userRepository.update(user!.id, { resetTokenPassword: token })

        // Send email notification for password change
        await transporter.sendMail({
            from: '"Recuperar tu contraseña" <leonel.carro94@gmail.com>', // sender address
            to: user.email, // list of receivers
            subject: "Trivia App", // Subject line
            html: `
                <h1 style='text-center; color:white; font-weight:bold;'>Trivia<b style='text-center; color:yellow; font-weight:bold;'>App</b></h1> 
                <div style='display:flex; flex-wrap:wrap; flex-direction:column; align-items:center; justify-content:center; background-color: #27272a; width: 100%; padding: 15px;'>
                    <h3 style='text-align:center; color:white; font-size: 20px'>¿Perdiste tu contraseña?</h3>
                    </br>
                    </br>
                    <a href="${link}" target="_blank">Ir a cambiar mi contraseña</a>
                </div>
            `
        });

        return {
            messageSuccess,
            link,
            token
        }

    }

    /** 
    *    Called by updateForgotPassword in controller
    *    This func find user by resetToken and update password 
    *    @param newPassword
    *    @param resetToken
    *    @return void
    */

    async createNewForgotPassword(newPassword: string, resetToken: Express.Request["tokenForgotPassword"]): Promise<void> {

        const user = await this.userRepository.findOne({ where: { resetTokenPassword: resetToken } })

        const newPasswordHash = this.userEntity.hashPassword(newPassword)

        await this.userRepository.update({ id: user!.id }, { password: newPasswordHash })

    }

    /** 
    *    Called by getUserTokenResetPassword in controller
    *    This func return the user for the token reset password
    *    @param token
    *    @return User for the token reset password
    */

    async getTokenResetPassword(token: string) {

        return await this.userRepository.find({ where: { resetTokenPassword: token } })

    }

    /** 
   *    Called by deleteUserTokenResetPassword in controller
   *    This func delete the reset token password
   *    @param token
   *    @return void
   */

    async deleteTokenResetPassword(token: string) {
        const user = await this.userRepository.findOne({ where: { resetTokenPassword: token } })
        console.log(user)
        await this.userRepository.update({ id: user!.id }, { resetTokenPassword: '' })
    }

}