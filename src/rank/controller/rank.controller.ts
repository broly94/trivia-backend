import { Request, Response } from "express";
import { RankService } from "../services/rank.service";

export class RankController extends RankService {


    async getRank(req: Request, res: Response) {
        const rank = await this.getAllRank();
        console.log(rank)
        return res.status(200).json({
            rank
        })
    }


    async postRank(req: Request, res: Response) {
        try {
            const user_id = Number(req.params.id)
            await this.insertUserToRank(user_id)
            return res.status(200).json({
                message: "User registered successfully in rank"
            }) 
        } catch (error) {
            return res.status(404).json({
                messageError: `Error inserting user into rank: ${error}`
            })
        }
    }
}