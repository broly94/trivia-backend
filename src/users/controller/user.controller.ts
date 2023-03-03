import { Request, Response } from "express";

export class UserController {
    public getUsers(req: Request, res: Response){
        return res.status(200).json({
            message: "Users List"
        })
    }
}