import { IsOptional, IsString, MinLength } from "class-validator";
import { BaseDTO } from "../../config/base.dto";


export class UserUpdateDTO extends BaseDTO{
    @IsString()
    @IsOptional()
    @MinLength(3)
    public name: string
}