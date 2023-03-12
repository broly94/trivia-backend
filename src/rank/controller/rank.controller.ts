import { Request, Response } from "express";
import { RankService } from "../services/rank.service";

export class RankController extends RankService {


    async getRank(req: Request, res: Response) {
        try {
            const rank = await this.getAllRank();
            return res.status(200).json({
                rank,
                error: false
            })
        } catch (error) {
            return res.status(404).json({
                messageError: `Error getting ranking : ${error}`,
                error: true
            })
        }
    }
}