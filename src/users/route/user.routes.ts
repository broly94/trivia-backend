import { BaseRoutes } from "../../routes/router";
import { UserController } from "../controller/user.controller";
import { authenticateToken } from "../middlewares/verifyToken";

export class UserRoutes extends BaseRoutes<UserController> {
    constructor() {
        super(UserController)
    }

    routes(): void {
        this.router.get('/users', authenticateToken, (req, res) => this.controller.getUsers(req, res))
        this.router.get('/user/:id', (req, res) => this.controller.getUser(req, res))
        this.router.post('/login', (req, res) => this.controller.login(req, res))
        this.router.post('/user', (req, res) => this.controller.postUser(req, res))
    }
}