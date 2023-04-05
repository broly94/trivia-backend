import { NextFunction, Request, Response } from "express";
import { AuthMiddleware } from "../../auth/middlewares/auth.middlewares";

export class CategoryMiddleware extends AuthMiddleware {

    async userAuth(req: Request, res: Response, next: NextFunction) {
        AuthMiddleware.authenticateToken(req, res, next)
    }

}