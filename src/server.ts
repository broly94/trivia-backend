import express from 'express'
import morgan from  'morgan'
import cors from 'cors'
import { UserRoutes } from './users/route/user.routes'
import { ConfigServer } from './config/configServer'

class ServerBootstrap extends ConfigServer{
    
    public app: express.Application = express()
    private port: number = Number(process.env.PORT) || 3002

    constructor() {
        super()
        this.app.use(morgan('dev'))
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true }))
        this.app.use(cors())
        this.app.use('/api', this.routes())
        this.dbConntect()
        this.listen()
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Server listening on port ${this.port}`)
        })
    }

    private async dbConntect() {
        try {
            const conn = await this.typeORMConfig().initialize()
            
            if(!conn) {
                throw new Error()
            }
            console.log("Db connection successful")
        } catch (error) {
            console.log({message: `No se pudo conecar a la DB: ${error}`})
        }
    }

    private routes(): Array<express.Router>{
        return [new UserRoutes().router]
    }
}

new ServerBootstrap