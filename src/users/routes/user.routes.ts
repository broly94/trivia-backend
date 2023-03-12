import { BaseRoutes } from "../../routes/router";
import { UserController } from "../controller/user.controller";
import { UserMiddleware } from "../middlewares/user.middlewares";

export class UserRoutes extends BaseRoutes<UserController,UserMiddleware > {
    constructor() {
        super(UserController, UserMiddleware);
    }

    routes(): void {

        //Get all users
        this.router.get('/users', this.middleware.userAuth, (req, res) => this.controller.getUsers(req, res))

        //Get user by id
        this.router.get('/user/:id', this.middleware.userAuth, (req, res) => this.controller.getUser(req, res))

        //Create user
        this.router.post('/user', this.middleware.validateCreateDTO, (req, res) => this.controller.postUser(req, res))

        //Update user
        this.router.put('/user/:id', this.middleware.userAuth, this.middleware.validateUpdateDTO, (req, res) => this.controller.updateUser(req, res))
        
        //Delete user by id
        this.router.delete('/user/:id', this.middleware.userAuth, (req, res) => this.controller.deleteUser(req, res))

        //Send email forgot password
        this.router.put('/forgot-password', (req, res) => this.controller.sendEmailForgotPassword(req, res))

        //Create new password 
        this.router.put('/reset-new-password', this.middleware.forgotPasswordToken ,(req, res) => this.controller.updateForgotPassword(req, res))

        //change password
        this.router.put('/change-password', this.middleware.userAuth, (req, res) => this.controller.changePassword(req, res))
    }
}