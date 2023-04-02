import { NextFunction, Request, Response } from 'express'
import config from '../../config/config';
import jwt from 'jsonwebtoken'

export class AuthMiddleware {

  protected static authenticateToken(req: Request, res: Response, next: NextFunction) {
    try {

      const authHeader = req.headers.authorization
      const token = authHeader && authHeader.split(' ')[1]

      if (token == null) return res.status(401).json({ status: '401 Unauthorized', error: true, token: null })

      const userVerify = jwt.verify(token, config.jwt.jwtSecret)
      if (userVerify == null) return res.status(403).json({ message: "error" })

      req.user = userVerify

      next()

    } catch (error) {
      res.status(400).json({ message: error })
    }
  }
}