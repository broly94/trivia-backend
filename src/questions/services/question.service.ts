import { Repository } from "typeorm";
import { AnswerEntity } from "../../entities/answer.entity";
import { CategoryEntity } from "../../entities/category.entity";
import { LevelTypes, QuestionEntity } from "../../entities/question.entity";
import { Answers } from "../dto/createQuestion.dto";

export class QuestionService {

    constructor(private questionRepository: Repository<QuestionEntity>, private answerRepository: Repository<AnswerEntity>, private categoryRepository: Repository<CategoryEntity>) { }

    /**
     * this function only returns 20 questions
     * @returns Questions[]
     */

    async getAllQuestions(quantityQuestions: number) {
        return await this.questionRepository.createQueryBuilder('question')
            .leftJoinAndSelect("question.answers", "answer")
            .leftJoinAndSelect("question.category", "category")
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
     * this function creates a new question with answers and its corresponding category
     * @returns Questions[]
     */

    async createQuestion(question: string, level: Enumerator<LevelTypes>, points: number, category: number, answers: Answers[]) {

        const totalAnswers =  this.answerRepository.create(answers)
        await this.answerRepository.save(totalAnswers)

        const categoryId = this.categoryRepository.create({ id: category })

        const newQuestion = this.questionRepository.create({ question, level, points, category: categoryId, answers: totalAnswers })

        await this.questionRepository.save(newQuestion)
    }

}