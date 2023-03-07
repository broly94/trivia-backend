import { BaseRoutes } from "../../routes/router";
import { RankController } from "../controller/rank.controller";
import { RankMiddleware } from "../middlewares/rank.middelware";

export class RankRoutes extends BaseRoutes<RankController, RankMiddleware> {


    constructor() {
        super(RankController, RankMiddleware);
    }

    routes(): void {
        this.router.get('/rank', (req, res) => this.controller.getRank(req, res))
        this.router.post('/rank/:id', (req, res) => this.controller.postRank(req, res))
    }
}