import { NextFunction, Request, Response } from 'express'
import { validate } from 'class-validator';

import { AuthMiddleware } from '../../auth/middlewares/auth.middlewares';

/** DTO */
import { UserCreateDTO } from '../dto/create.dto';
import { UserUpdateDTO } from '../dto/update.dto';

declare module 'express' {
  interface Request {
    user?: any;
    tokenForgotPassword?: any
  }
}

export class UserMiddleware extends AuthMiddleware {

  public userAuth (req: Request, res: Response, next: NextFunction) {
    AuthMiddleware.authenticateToken(req, res, next)
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

