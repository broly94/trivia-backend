import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import config from './config/config'

import { myDataSource } from './config/configServer'

/* Routes */
import { UserRoutes } from './users/routes/user.routes'
import { RankRoutes } from './rank/routes/rank.routes'
import { AuthRoutes } from './auth/routes/auth.routes'
/* Routes */

class ServerBootstrap {

    public app: express.Application = express()
    private port: number = Number(config.init.port)

    constructor() {
        this.app.use(morgan('dev'))
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true }))
        this.app.use(cors())
        this.app.use('/api', this.routes())
        this.listen()
        myDataSource
            .initialize()
            .then(() => {
                console.log("Data Source has been initialized!")
            })
            .catch(() => {
                console.log("Data Source has not been initialized!")
            })
    }



    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server listening on port ${this.port}`)
        })
    }

    // protected async dbConntect() {
    //     try {
    //         const conn = await this.typeORMConfig().initialize()
    //         if (!conn) {
    //             throw new Error()
    //         }
    //         console.log("Db connection successful")
    //     } catch (error) {
    //         console.log({ message: `No se pudo conecar a la DB: ${error}` })
    //     }
    // }    

    private routes(): Array<express.Router> {
        return [
            new UserRoutes().router,
            new RankRoutes().router,
            new AuthRoutes().router
        ]
    }
}

new ServerBootstrap