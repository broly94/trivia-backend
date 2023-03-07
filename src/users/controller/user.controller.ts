import { Request, Response } from "express";
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

        const { name, email, password, points, role } = req.body;

        try {

            await this.registerUser(name, email, password, points, role)

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

}