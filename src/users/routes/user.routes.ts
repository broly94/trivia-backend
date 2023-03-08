import { BaseRoutes } from "../../routes/router";
import { UserController } from "../controller/user.controller";
import { UserMiddleware } from "../middlewares/user.middlewares";

export class UserRoutes extends BaseRoutes<UserController,UserMiddleware > {
    constructor() {
        super(UserController, UserMiddleware);
    }

    routes(): void {
        this.router.get('/users', this.middleware.authenticateToken, (req, res) => this.controller.getUsers(req, res))

        this.router.get('/user/:id', this.middleware.authenticateToken, (req, res) => this.controller.getUser(req, res))

        this.router.post('/user', this.middleware.validate, (req, res) => this.controller.postUser(req, res))
        
        this.router.delete('/user/:id', this.middleware.authenticateToken, (req, res) => this.controller.deleteUser(req, res))

        this.router.put('/forgot-password', (req, res) => this.controller.sendEmailForgotPassword(req, res))

        this.router.put('/reset-new-password', this.middleware.forgotPasswordToken ,(req, res) => this.controller.updateForgotPassword(req, res))
    }
}