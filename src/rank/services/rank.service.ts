import { MoreThan } from "typeorm"
import { myDataSource } from "../../config/configServer"
import { RankEntity } from "../../entities/rank.entity"
import { RankDTO } from "../../shared/DTO/rank.dto"

export class RankService {

    public rankRepository = myDataSource.getRepository(RankEntity)

    async getAllRank() {
        const rank = this.rankRepository.find({
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
        const userRank = this.rankRepository.create({ user_id: id })
        await this.rankRepository.save(userRank)
    }

}