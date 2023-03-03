import { BaseRoutes } from "../../routes/router";
import { UserController } from "../controller/user.controller";

export class UserRoutes extends BaseRoutes<UserController> {
    constructor() {
        super(UserController)
    }

    routes(): void {
        this.router.get('/users', (req, res) => this.controller.getUsers(req, res))
    }
}