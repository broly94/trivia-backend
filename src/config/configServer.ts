import { DataSource} from "typeorm"
import { SnakeNamingStrategy } from "typeorm-naming-strategies"
import { RankEntity } from "../entities/rank.entity"
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
        RankEntity
    ],
    namingStrategy: new SnakeNamingStrategy()
})

// export abstract class ConfigServer {

//     private options: DataSourceOptions = {
//         type: "mysql",
//         host: config.database.host,
//         port: Number(config.database.port),
//         username: config.database.user,
//         password: config.database.password,
//         database: config.database.dataBaseName,
//         synchronize: true,
//         logging: false,
//         entities: [__dirname + "/../**/*.entity{.ts,.js}"],
//         namingStrategy: new SnakeNamingStrategy()
//     }

//     public typeORMConfig() {
//         return new DataSource({
//             type: "mysql",
//             host: config.database.host,
//             port: Number(config.database.port),
//             username: config.database.user,
//             password: config.database.password,
//             database: config.database.dataBaseName,
//             synchronize: true,
//             logging: false,
//             entities: ["src/entities/*.entity{.ts,.js}"],
//             namingStrategy: new SnakeNamingStrategy()
//         })
//     }


// }