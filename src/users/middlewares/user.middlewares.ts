import { validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import config from '../../config/config';
import { UserEntity } from '../../entities/user.entitiy';
import { UserDTO } from '../../shared/DTO/user.dto';

declare module 'express' {
  interface Request {
    user?: any;
  }
}
export class UserMiddleware {

  public authenticateToken(req: Request, res: Response, next: NextFunction) {
    try {
      console.log(req.headers)
      const authHeader = req.headers.authorization
      const token = authHeader && authHeader.split(' ')[1]

      if (token == null) return res.status(401).json({ status: '401 Unauthorized', error: true })

      const userVerify = jwt.verify(token, config.jwtSecret)
      if (userVerify == null) return res.status(403).json({ message: "error" })

      req.user = userVerify

      next()

    } catch (error) {
      res.status(400).json({ message: error })
    }
  }


  async validate(req: Request, res: Response, next: NextFunction) {

    const { name, email, password, points, role, resetTokenPassword } = req.body

    let valid = new UserDTO()
    valid.name = name
    valid.email = email
    valid.password = password
    valid.points = points
    valid.role = role
    valid.resetTokenPassword = resetTokenPassword

    const errors = await validate(valid)

    if (errors.length > 0) {
      return res.status(500).json({
        errors,
        error: true
      })
    } else {
      next()
    }
  }

}