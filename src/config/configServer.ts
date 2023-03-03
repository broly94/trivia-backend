import { DataSource } from "typeorm"
import { UserEntity } from "../entities/user.entitiy"

export abstract class ConfigServer {

    public typeORMConfig() {
        const MysqlDataSource = new DataSource({
            type: "mysql",
            host: "localhost",
            port: 3306,
            username: "root",
            password: "root",
            database: "trivia",
            synchronize: true,
            logging: false,
            entities: [UserEntity],
        })

       return MysqlDataSource
    }


}