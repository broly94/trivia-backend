import { NextFunction, Request, Response } from "express";
import { UserService } from "../services/user.service";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";

interface IUser {
    name?: string;
    email: string
    password: string
}

export class UserController extends UserService {

    constructor() {
        super();
    }

    public async getUsers(req: Request, res: Response) {

        try {

            const users = await this.getAllUsers()

            if(users == null) {
                throw new Error('Users not found')
            }
            
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
            if(user == null) {
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

        const { name, email, password } = req.body;

        try {

            if(!name || !email || !password){
                throw new Error('please enter valid email or password')
            }

            await this.registerUser(name, email, password)
            res.json({
                message: 'User registration successful'
            })

        } catch (error) {
            res.status(400).json({ message: `${error}` })
        }
    }

    public async login(req: Request, res: Response) {

        const { email, password } = req.body;

        try {

            if(!email || !password){
                 throw new Error('please enter valid email or password')
            }

            const user = await this.LoginUser(email)
            const isValid = bcrypt.compareSync(password, user!.password)
            
            if(!user || !isValid){
                throw new Error("User not found")
            } 
            
            const secret = process.env.TOKEN_SECRET || "secretwebtoken"
            const token = jwt.sign(user!.name, secret)

            return res.status(200).json({
                user,
                token,
            })
            
        } catch (error) {
            res.status(400).json({ message: `${error}` })
            
        }
    }
}