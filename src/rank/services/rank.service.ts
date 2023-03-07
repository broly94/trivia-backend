import { MoreThan } from "typeorm"
import { BaseServices } from "../../config/base.services"
import { RankEntity } from "../../entities/rank.entity"
import { RankDTO } from "../../shared/DTO/rank.dto"

export class RankService extends BaseServices {


    async getAllRank() {
        const rank = (await this.managerEntity()).find(RankEntity, {
            relations: {
                user: true
            },
            where: {
                user: {
                    points: MoreThan(0)
                }
            },
            select: {
                user_id: true,
                user: {
                    name: true,
                    email: true,
                    points: true

                }
            },
            order: {
                user: {
                    points: "DESC"
                }
            }
        })

        const rankDTO = (await rank).map(data => {
            return new RankDTO(data.user_id, data.user.name, data.user.email, data.user.points);
        })
        return Object.assign(rankDTO)
    }

    async insertUserToRank(id: number) {
        return await (await this.managerEntity()).insert(RankEntity, { user_id: id })
    }

}