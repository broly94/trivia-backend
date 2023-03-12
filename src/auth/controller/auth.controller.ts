import { Request, Response } from "express";
import config from "../../config/config";

import { AuthService } from "../services/auth.service";

import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export class AuthController extends AuthService{

    public async AuthUser(req: Request, res: Response) {

        const { email, password } = req.body;

        try {

            if (!email || !password) {
                throw new Error('Please enter valid email or password')
            }

            const user = await this.LoginUser(email)

            if (user === null) {
                throw new Error("The user does not is registered")
            }

            const isValid = bcrypt.compareSync(password, user.password)
            if (!isValid) {
                throw new Error("The password or the user does not match")
            }

            const secret = config.jwt.jwtSecret
            const token = jwt.sign({ id: user.id, user: user.name, email: user.email }, secret, { expiresIn: '24h' })

            return res.status(200).json({
                user,
                token
            })

        } catch (error) {
            res.status(400).json({ message: `${error}`, error: true })

        }
    }

}