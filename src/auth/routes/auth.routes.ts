import { BaseRoutes } from "../../routes/router";
import { AuthController } from "../controller/auth.controller";
import { AuthMiddleware } from "../middlewares/auth.middlewares";

export class AuthRoutes extends BaseRoutes<AuthController, AuthMiddleware> {

    constructor(){
        super(AuthController, AuthMiddleware)
    }

    routes(): void {
        this.router.post('/auth', (req, res) => this.controller.AuthUser(req, res))
    }

}