import { BaseRoutes } from "../../routes/router";
import { QuestionController } from "../controllers/question.controller";
import { QuestionMiddleware } from "../middlewares/question.middleware";

export class QuestionRoutes extends BaseRoutes<QuestionController, QuestionMiddleware> {

    constructor() {
        super(QuestionController, QuestionMiddleware);
    }

    routes(): void {
        
        this.router.get('/all-questions', this.middleware.userAuth, this.middleware.validateQueryLevelQuestions, (req, res) => this.controller.getQuestion(req, res))

        this.router.get('/questions', this.middleware.userAuth, this.middleware.validateQueryLevelAndCategoryQuestions, (req, res) => this.controller.getQuestionsByLevelAndCategory(req, res))

        this.router.post('/question', this.middleware.userAuth, this.middleware.validateCreateQuestionDTO ,(req, res) => this.controller.postQuestion(req, res))
        
    }

}