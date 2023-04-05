import { BaseRoutes } from "../../routes/router";
import { CategoryController } from "../controllers/category.controller";
import { CategoryMiddleware } from "../middlewares/category.middleware";

export class CategoryRoutes  extends BaseRoutes<CategoryController, CategoryMiddleware> {

    constructor() {
        super(CategoryController, CategoryMiddleware);
    }

    routes(): void {
        
        this.router.get('/categories', this.middleware.userAuth ,(req, res) => this.controller.getCategory(req, res))

    }


}