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
        this.router.put('/user', this.middleware.userAuth, this.middleware.validateUpdateDTO, (req, res) => this.controller.updateUser(req, res))
        
        //Delete user by id
        this.router.delete('/user/:id', this.middleware.userAuth, (req, res) => this.controller.deleteUser(req, res))

        //change password
        this.router.put('/change-password', this.middleware.userAuth, this.middleware.validateChangePasswordDTO, (req, res) => this.controller.changePassword(req, res))

        //Get users by points
        this.router.get('/users-rank', (req, res) => this.controller.getUsersByPoints(req, res))

        //Set points to user
        this.router.put('/set-points', this.middleware.userAuth, (req, res) => this.controller.setPointsUser(req, res))
        
        //Send email forgot password
        this.router.put('/forgot-password', this.middleware.validateEmailForgotPasswordDTO, (req, res) => this.controller.sendEmailForgotPassword(req, res))

        //Create new forgot password 
        this.router.put('/reset-new-password', this.middleware.validateCreateNewForgotPasswordDTO ,(req, res) => this.controller.updateForgotPassword(req, res))

        //Get user by the token reset password
        this.router.get('/token-reset-password', (req, res) => this.controller.getUserTokenResetPassword(req, res))

        //Delete the token reset password 
        this.router.put('/delete-token-reset-password', (req, res) => this.controller.deleteUserTokenResetPassword(req, res))
    }
}