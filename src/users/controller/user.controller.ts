import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";

export class UserController extends UserService {

    constructor() {
        super();
    }

    public async getUsers(req: Request, res: Response) {
        try {
            const users = await this.getAllUsers()
            users == null || undefined && res.status(404).json({ message: "User not found", error: true })
            return res.status(200).json({
                users,
                userLoggin: req.user
            })
        } catch (error) {
            res.status(400).json({ message: error })
        }
    }

    public async getUser(req: Request, res: Response) {
        const { id } = req.params
        try {
            const user = await this.getOneUser(id)
            user == null && res.status(404).json({ message: "User not found", error: true })
            return res.status(200).json({
                user
            })
        } catch (error) {
            res.status(400).json({ message: error })
        }
    }

    public async postUser(req: Request, res: Response) {
        const { name, email, password } = req.body;
        try {
            await this.registerUser(name, email, password)
            res.json({
                message: 'User registration successful'
            })

        } catch (error) {
            res.status(400).json({ message: error })
        }
    }

    public async login(req: Request, res: Response) {
        const { email, password } = req.body;
        try {
            const user = await this.LoginUser(email)
            !user && res.status(403).json({message: 'Invalid user', error: true})
            const isValid = bcrypt.compareSync(password, user!.password);
            !isValid && res.status(403).json({message: 'Invalid password', error: true})
            const secret = process.env.TOKEN_SECRET || "secretwebtoken"
            const token = jwt.sign(user!.name, secret)
            return res.status(200).json({
                user,
                token,
            })
            
        } catch (error) {
            res.status(400).json({ message: error })
            
        }
    }
}