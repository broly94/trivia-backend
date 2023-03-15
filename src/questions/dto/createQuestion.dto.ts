import { IsArray, IsDecimal, IsEnum, IsInt, IsNotEmpty, IsString } from "class-validator";
import { BaseDTO } from "../../config/base.dto";
import { LevelTypes } from "../../entities/question.entity";

export interface Answers {
    name: string,
    is_true: boolean
}

export class CreateQuestionDTO extends BaseDTO {

    @IsNotEmpty()
    @IsString()
    question: string

    @IsNotEmpty()
    @IsEnum(LevelTypes)
    level: Enumerator<LevelTypes> | undefined

    @IsNotEmpty()
    @IsInt()
    points: number

    @IsNotEmpty()
    @IsInt()
    category: number

    @IsNotEmpty()
    @IsArray()
    answers: Answers[]

}