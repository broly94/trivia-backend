import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { AuthMiddleware } from "../../auth/middlewares/auth.middlewares";
import { CreateQuestionDTO } from "../dto/createQuestion.dto";
import { LevelTypes } from "../interfaces/question.interfaces";

export class QuestionMiddleware extends AuthMiddleware {

  async userAuth(req: Request, res: Response, next: NextFunction) {
    AuthMiddleware.authenticateToken(req, res, next)
  }

  async validateCreateQuestionDTO(req: Request, res: Response, next: NextFunction) {

    const { question, level, points, category, answers } = req.body

    const valid = new CreateQuestionDTO()

    valid.question = question
    valid.level = level
    valid.points = points
    valid.category = category
    valid.answers = answers

    const errors = await validate(valid)

    try {

      if (errors.length > 0) {

        return res.status(500).json({
          errors,
          error: true
        })

      }

      next()

    } catch (error) {
      return res.status(404).json({ message: error })
    }

  }

  async validateQueryLevelQuestions(req: Request, res: Response, next: NextFunction) {

    const level = req.query.level as string
    const queryQuestionsLevel = level.toLocaleUpperCase() as LevelTypes

    try {

      if (!Object.values(LevelTypes)?.includes(queryQuestionsLevel)) {
        return res.status(404).json({
          message: "The parameter have to be {BASIC, MEDIUM or ADVANCED}",
          error: true
        })
      }

      next()

    } catch (error) {
      return res.status(404).json({ message: error })
    }

  }

}