import { EntityManager } from "typeorm";
import { ConfigServer } from "./configServer";

export class BaseServices extends ConfigServer {

    public async managerEntity(): Promise<EntityManager> {
        const source = await this.typeORMConfig().initialize()
        return source.manager
   }

}