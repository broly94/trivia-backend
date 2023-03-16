import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { LevelTypes } from "../interfaces/question.interfaces";

export class QueryLevelAndCategoryDTO {
    
    @IsNotEmpty()
    @IsEnum(LevelTypes)
    level: LevelTypes

    @IsNotEmpty()
    @IsString()
    category: string

}