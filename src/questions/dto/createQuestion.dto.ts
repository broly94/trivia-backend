import { IsArray, IsDecimal, IsEnum, IsInt, IsNotEmpty, IsString } from "class-validator";
import { BaseDTO } from "../../config/base.dto";
import { Answers, LevelTypes } from "../interfaces/question.interfaces";




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