import { BaseServices } from "../../config/base.services"
import { RankEntity } from "../../entities/rank.entity"

export class RankService extends BaseServices {

    async getAllRank() {
        const rank = (await this.managerEntity()).find(RankEntity, {
            relations: {
                users: true
            },
            select: {
                users: {
                    name: true,
                    email: true,
                    points: true
    
                }
            }
        })
        return rank
    }

    async insertUserToRank(id: number) {
        const rank = (await this.managerEntity()).insert(RankEntity, { user_id: id })
        console.log(rank)
        return rank
    }

}