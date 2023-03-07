import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";
import config from "../../config/config";

export class UserController extends UserService {

    public async getUsers(req: Request, res: Response) {

        try {
            const users = await this.getAllUsers()

            if (users == null) {
                throw new Error('Users not found')
            }

            return res.status(200).json({
                users,
                userLoggin: req.user
            })
        } catch (error) {
            res.status(400).json({ message: `${error}` })
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
                user
            })
        } catch (error) {
            res.status(400).json({ message: `${error}` })
        }
    }

    public async postUser(req: Request, res: Response) {

        const { name, email, password, points, role } = req.body;

        try {

            if (!name || !email || !password) {
                throw new Error('Fill in the empty fields: Name, Email and Password are required')
            }

            if (name.length <= 0 || name.length <= 3){
                throw new Error('Name cannot be empty or greater than 3 characters')
            }

            await this.registerUser(name, email, password, points, role)

            return res.json({
                message: 'User registration successful'
            })

        } catch (error) {
            const err = `${error}`
            if (err.includes('Duplicate entry')) {
                res.status(400).json({ message: "The email is already in use ", error: true })
            } else {
                res.status(400).json({ message: `${error}`, error: true })
            }
        }
    }

    public async login(req: Request, res: Response) {

        const { email, password } = req.body;

        try {

            if (!email || !password) {
                throw new Error('Please enter valid email or password')
            }

            const user = await this.LoginUser(email)

            if(user === null) {
                throw new Error("The user does not is registered")
            }

            const isValid = bcrypt.compareSync(password, user.password)
            if (!isValid) {
                throw new Error("The password or the user does not match")
            }

            const secret = config.jwtSecret
            const token = jwt.sign({ user: user.name, email: user.email }, secret, { expiresIn: '24h' })

            return res.status(200).json({
                user,
                token
            })

        } catch (error) {
            res.status(400).json({ message: `${error}`, error: true })

        }
    }
}