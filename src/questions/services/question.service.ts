import { Repository } from "typeorm";

import { LevelTypes, Answers } from "../interfaces/question.interfaces";

import { AnswerEntity } from "../../entities/answer.entity";
import { CategoryEntity } from "../../entities/category.entity";
import { QuestionEntity } from "../../entities/question.entity";


export class QuestionService {

    constructor(private questionRepository: Repository<QuestionEntity>, private answerRepository: Repository<AnswerEntity>, private categoryRepository: Repository<CategoryEntity>) { }

    /**
     * Called by getQuestion in controller
     * this function only returns 20 questions
     * @returns Questions[]
     */

    async getAllQuestionsAnyCategory(level: LevelTypes, quantityQuestions: number) {
        return await this.questionRepository.createQueryBuilder('question')
            .leftJoinAndSelect("question.answers", "answer")
            .leftJoinAndSelect("question.category", "category")
            .where("question.level = :level", { level })
            .select(
                [
                    "question.id",
                    "question.question",
                    "question.level",
                    "question.points",
                    "answer.id",
                    "answer.name",
                    "answer.is_true",
                    "category.name"
                ]
            )
            .orderBy('RAND()')
            .take(quantityQuestions)
            .getMany()
    }

    /**
     * Called by getQuestionsByLevel in controller
     * this function only returns 20 questions by level
     * @returns Questions[] by level
     */

    async getAllQuestionsByLevelAndCategory(category: string, level: LevelTypes, quantityQuestions: number) {

        return await this.questionRepository.createQueryBuilder('question')
            .leftJoinAndSelect("question.answers", "answer")
            .leftJoinAndSelect("question.category", "category")
            .where("question.level = :level", { level })
            .andWhere("category.name = :category", { category })
            .select(
                [
                    "question.id",
                    "question.question",
                    "question.level",
                    "question.points",
                    "answer.id",
                    "answer.name",
                    "answer.is_true",
                    "category.name"
                ]
            )
            .orderBy('RAND()')
            .take(quantityQuestions)
            .getMany()

    }

    /**
     * Called by postQuestion in controller
     * this function creates a new question with answers and its corresponding category
     * @returns Questions[]
     */

    async createQuestion(question: string, level: Enumerator<LevelTypes>, points: number, category: number, answers: Answers[]) {

        const totalAnswers = this.answerRepository.create(answers)
        await this.answerRepository.save(totalAnswers)

        const categoryId = this.categoryRepository.create({ id: category })

        const newQuestion = this.questionRepository.create({ question, level, points, category: categoryId, answers: totalAnswers })

        await this.questionRepository.save(newQuestion)
    }

    async changeQuestion() {

    }

}