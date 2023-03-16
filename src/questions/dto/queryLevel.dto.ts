import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { LevelTypes } from "../interfaces/question.interfaces";

export class QueryLevelDTO {
    
    @IsNotEmpty()
    @IsEnum(LevelTypes)
    level: LevelTypes

}