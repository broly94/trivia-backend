import { DataSource} from "typeorm"
import { SnakeNamingStrategy } from "typeorm-naming-strategies"
import { AnswerEntity } from "../entities/answer.entity"
import { CategoryEntity } from "../entities/category.entity"
import { QuestionEntity } from "../entities/question.entity"
import { UserEntity } from "../entities/user.entitiy"
import config from "./config"

export const myDataSource = new DataSource({
    type: "mysql",
    host: config.database.host,
    port: Number(config.database.port),
    username: config.database.user,
    password: config.database.password,
    database: config.database.dataBaseName,
    synchronize: true,
    logging: false,
    entities: [
        UserEntity,
        QuestionEntity,
        AnswerEntity,
        CategoryEntity
    ],
    namingStrategy: new SnakeNamingStrategy()
})