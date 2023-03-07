import { DataSource, DataSourceOptions, EntityManager, EntityOptions, EntityTarget, Repository } from "typeorm"
import { SnakeNamingStrategy } from "typeorm-naming-strategies"
import { RankEntity } from "../entities/rank.entity"

import { UserEntity } from "../entities/user.entitiy"

export abstract class ConfigServer {

    constructor() {
        this.dbConntect()
    }

    private options: DataSourceOptions = {
        type: "mysql",
        host: "localhost",
        port: 3306,
        username: "root",
        password: "root",
        database: "trivia",
        synchronize: true,
        logging: false,
        entities: [UserEntity, RankEntity],
        namingStrategy: new SnakeNamingStrategy()
    }

    public typeORMConfig() {
        return new DataSource(this.options)
    }

    protected async dbConntect() {
        try {
            const conn = await this.typeORMConfig().initialize()
            if (!conn) {
                throw new Error()
            }
            console.log("Db connection successful")
        } catch (error) {
            console.log({ message: `No se pudo conecar a la DB: ${error}` })
        }
    }    
}