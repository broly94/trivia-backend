import { NextFunction, Request, Response } from "express";
import { validate } from "class-validator";

import { LevelTypes } from "../interfaces/question.interfaces";

import { AuthMiddleware } from "../../auth/middlewares/auth.middlewares";

import { QueryLevelDTO } from "../dto/queryLevel.dto";
import { CreateQuestionDTO } from "../dto/createQuestion.dto";
import { QueryLevelAndCategoryDTO } from "../dto/queryLevelAndCategory.dto";

export class QuestionMiddleware extends AuthMiddleware {

  /**
   * This middleware will validate that input data with DTO
   * @param req 
   * @param res 
   * @param next 
   */

  async userAuth(req: Request, res: Response, next: NextFunction) {
    AuthMiddleware.authenticateToken(req, res, next)
  }


    /**
   * This middleware will validate that input data with DTO
   * @param req 
   * @param res 
   * @param next 
   */

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

  /**
   * This middleware will validate that input data with DTO
   * @param req 
   * @param res 
   * @param next 
   */

  async validateQueryLevelAndCategoryQuestions(req: Request, res: Response, next: NextFunction) {

    const level = req.query.level as string
    const queryQuestionsLevel = level.toLocaleUpperCase() as LevelTypes

    const category = req.query.category as string

    try {

      const valid = new QueryLevelAndCategoryDTO()

      valid.level = queryQuestionsLevel
      valid.category = category

      const errors = await validate(valid)

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

      const valid = new QueryLevelDTO()

      valid.level = queryQuestionsLevel

      const errors = await validate(valid)

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

}