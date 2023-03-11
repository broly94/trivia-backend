import { NextFunction, Request, Response } from 'express'
import config from '../../config/config';
import { validate } from 'class-validator';
import jwt from 'jsonwebtoken'

/** DTO */
import { UserCreateDTO } from '../dto/create.dto';
import { UserUpdateDTO } from '../dto/update.dto';

declare module 'express' {
  interface Request {
    user?: any;
    tokenForgotPassword?: any
  }
}

export class UserMiddleware {

  public authenticateToken(req: Request, res: Response, next: NextFunction) {
    try {

      const authHeader = req.headers.authorization
      const token = authHeader && authHeader.split(' ')[1]

      if (token == null) return res.status(401).json({ status: '401 Unauthorized', error: true })

      const userVerify = jwt.verify(token, config.jwt.jwtSecret)
      if (userVerify == null) return res.status(403).json({ message: "error" })

      req.user = userVerify

      next()

    } catch (error) {
      res.status(400).json({ message: error })
    }
  }

  public forgotPasswordToken(req: Request, res: Response, next: NextFunction) {
    try {

      const newPassword = req.body.password
      const resetTokenForgotPassword = req.headers.token

      if (newPassword == null || resetTokenForgotPassword == null) return res.status(400).json({ status: '400 Bad Request', error: true })

      req.tokenForgotPassword = resetTokenForgotPassword

      next()
    } catch (error) {
      res.status(400).json({ message: error })
    }
  }


  async validateCreateDTO(req: Request, res: Response, next: NextFunction) {

    const { name, email, password } = req.body

    let valid = new UserCreateDTO()
    valid.name = name
    valid.email = email
    valid.password = password

    const errors = await validate(valid)

    try {
      if (errors.length > 0) {
        return res.status(500).json({
          errors,
          error: true
        })
      } else {
        next()
      }
    } catch (error) {
      res.status(400).json({ message: error })
    }

  }

  async validateUpdateDTO(req: Request, res: Response, next: NextFunction) {

    const { name } = req.body

    let valid = new UserUpdateDTO()
    valid.name = name

    const errors = await validate(valid)

    try {
      if (errors.length > 0) {
        return res.status(500).json({
          errors,
          error: true
        })
      } else {
        next()
      }
    } catch (error) {
      res.status(400).json({ message: error })
    }

  }

}

