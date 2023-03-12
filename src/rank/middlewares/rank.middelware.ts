import { NextFunction, Request, Response } from "express";
import { AuthMiddleware } from "../../auth/middlewares/auth.middlewares";

export class RankMiddleware extends AuthMiddleware {
    
    public rankAuth(req: Request, res: Response, next: NextFunction) {
        AuthMiddleware.authenticateToken(req, res, next)
    }

}