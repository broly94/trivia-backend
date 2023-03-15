import { Request, Response } from "express"
import { myDataSource } from "../../config/database"
import { QuestionService } from "../services/question.service"

import { QuestionEntity } from "../../entities/question.entity"
import { AnswerEntity } from "../../entities/answer.entity"
import { CategoryEntity } from "../../entities/category.entity"


export class QuestionController extends QuestionService {

    constructor() {
        super(myDataSource.getRepository(QuestionEntity), myDataSource.getRepository(AnswerEntity), myDataSource.getRepository(CategoryEntity))
    }

    private quantityQuestions: number = 10

    async getQuestion(req: Request, res: Response) {
        
        try {
            const questions = await this.getAllQuestions(this.quantityQuestions)
            
            if(questions.length == 0) return res.status(200).json({ message: "Question not found", error: false})

            if(!questions) throw new Error("Could not get the questions")

            return res.status(200).json({
                questions,
                error: false
            })
        } catch (error) {
            res.status(404).json({ message: `${error}`, error: true})
        }
    }

    async postQuestion(req: Request, res: Response) {
        
        const { question, level, points, category, answers } = req.body

        try {

            await this.createQuestion(question, level, points, category, answers)
            return res.status(200).json({
                message: "Question has been created",
                error: false
            })
        } catch (error) {
            res.status(404).json({ message: `${error}`, error: true})            
        }
    }

}