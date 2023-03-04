import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

declare module 'express' {
    interface Request {
      user?: any;
    }
  }

export const  authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.status(401).json({ status: '401 Unauthorized', error: true })

  const userVerify = jwt.verify(token, process.env.TOKEN_SECRET || "secretwebtoken")
    if (userVerify == null) return res.status(403).json({message: "error"})

    req.user = userVerify

    next()
}