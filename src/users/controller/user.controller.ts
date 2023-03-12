import { Request, Response } from "express";
import config from "../../config/config";
import jwt from 'jsonwebtoken'

import { UserService } from "../services/user.service";

export class UserController extends UserService {

    public async getUsers(req: Request, res: Response) {

        try {
            const users = await this.getAllUsers()

            if (users == null) {
                throw new Error('Users not found')
            }

            return res.status(200).json({
                users,
                userLoggin: req.user,
                error: false
            })
        } catch (error) {
            res.status(400).json({
                message: `${error}`,
                error: true
            })
        }
    }

    public async getUser(req: Request, res: Response) {

        const { id } = req.params

        try {

            const user = await this.getOneUser(id)
            if (user == null) {
                throw new Error('User not found')
            }
            return res.status(200).json({
                user,
                error: false
            })
        } catch (error) {
            res.status(400).json({
                message: `${error}`,
                error: true
            })
        }
    }

    public async postUser(req: Request, res: Response) {

        const { name, email, password } = req.body;

        try {

            await this.registerUser(name, email, password)

            return res.json({
                message: 'User registration successful',
                error: false
            })

        } catch (error) {
            const err = `${error}`
            if (err.includes('Duplicate entry')) {
                res.status(400).json({
                    message: "The email is already in use ",
                    error: true
                })
            } else {
                res.status(400).json({
                    message: `${error}`,
                    error: true
                })
            }
        }
    }

    async updateUser(req: Request, res: Response) {

        const { id } = req.params
        const { name } = req.body

        try {

            const user = await this.changeDataUser(Number(id), name)

            if (user.affected === 0) {
                throw new Error('user could not update')
            }

            return res.status(200).json({
                message: 'User updated successfully',
                error: false
            })
        } catch (error) {
            res.status(400).json({ message: `${error}`, error: true })
        }

    }

    async deleteUser(req: Request, res: Response) {

        const { id } = req.params

        try {
            await this.eliminateUser(Number(id))

            return res.status(200).json({
                message: 'User deleted',
                error: false
            })
        } catch (error) {
            res.status(400).json({ message: `${error}`, error: true })
        }
    }

    //Hacerla una funcion interna. Ejecutarla cuando se actualiza el usaurio

    async changePassword(req: Request, res: Response) {

        const { password, newPassword } = req.body 
        const userLoggin = req.user
        try {

            const user = await this.setNewPassword(password, newPassword, userLoggin)
            
            if(!user ||user?.affected === 0) {
                throw new Error('The passwords do not match')
            }

            return res.json({
                message: 'Password changed successfully',
                error: false
            })
        } catch (error) {
            res.status(400).json({ message: `${error}`, error: true })
        }
    }

    /** Forgot Password methods */

    async sendEmailForgotPassword(req: Request, res: Response) {
        try {
            const { email } = req.body
            const { messageSuccess, link, messageError } = await this.forgotPassword(email)

            if (messageError) {
                throw new Error(messageError)
            }

            return res.status(200).json({
                messageSuccess,
                link,
                error: false
            })
        } catch (error) {
            res.status(400).json({ message: `${error}`, error: true })
        }
    }

    async updateForgotPassword(req: Request, res: Response) {

        try {
            const resetToken = req.tokenForgotPassword
            const password = req.body.password

            await this.createNewForgotPassword(password, resetToken)

            const isValid = jwt.verify(resetToken, config.jwt.jwtSecret)
            if (isValid == null) {
                throw new Error("The token is not valid")
            }

            return res.status(200).json({
                message: "Reset password successfully",
                error: false
            })
        } catch (error) {
            res.status(400).json({ message: `${error}`, error: true })
        }
    }
}