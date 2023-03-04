import { DataSource, DataSourceOptions } from "typeorm"
import { SnakeNamingStrategy } from "typeorm-naming-strategies"

import { UserEntity } from "../entities/user.entitiy"

export abstract class ConfigServer {

    private options: DataSourceOptions = {
        type: "mysql",
        host: "localhost",
        port: 3306,
        username: "root",
        password: "root",
        database: "trivia",
        synchronize: true,
        logging: false,
        entities: [UserEntity],
        namingStrategy: new SnakeNamingStrategy()
    }

    public typeORMConfig() {
        return new DataSource(this.options)
        
    }
}