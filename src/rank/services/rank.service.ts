import { MoreThan } from "typeorm"
import { myDataSource } from "../../config/configServer"
import { RankEntity } from "../../entities/rank.entity"

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

        const rankStruct = (await rank).map(data => {
            return new RankStruct(data.user_id, data.user.name, data.user.email, data.user.points);
        })
        return Object.assign(rankStruct)
    }

}

class  RankStruct {
    
    public id: number
    public name: string
    public email: string
    public points: number

    constructor(id: number, name: string, email: string, points: number) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.points = points;
    }
}