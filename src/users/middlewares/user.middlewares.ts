import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import config from '../../config/config';

declare module 'express' {
  interface Request {
    user?: any;
  }
}
export class UserMiddleware {

  public authenticateToken(req: Request, res: Response, next: NextFunction) {
    try {
      const authHeader = req.headers['authorization']
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
}