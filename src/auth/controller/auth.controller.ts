import { Request, Response } from "express";
import config from "../../config/config";

import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { AuthService } from "../services/auth.service";
import { myDataSource } from "../../config/database";
import { UserEntity } from "../../entities/user.entitiy";


export class AuthController extends AuthService{

    constructor() {
        super(myDataSource.getRepository(UserEntity))
    }

    public async AuthUser(req: Request, res: Response) {

        const { email, password } = req.body;

        try {

            if (!email || !password) {
                throw new Error('Please enter valid email or password')
            }

            const user = await this.loginUser(email)

            if (user === null) {
                throw new Error("The user does not is registered")
            }

            const isValid = bcrypt.compareSync(password, user.password)
            if (!isValid) {
                throw new Error("The password or the user does not match")
            }

            const secret = config.jwt.jwtSecret
            const token = jwt.sign({ id: user.id, name: user.name, email: user.email }, secret, { expiresIn: '24h' })

            return res.status(200).json({
                user,
                token
            })

        } catch (error) {
            res.status(400).json({ message: `${error}`, error: true })

        }
    }

}