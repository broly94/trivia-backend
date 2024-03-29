import { IsNotEmpty, IsString, MinLength } from "class-validator";
import { BaseDTO } from "../../config/base.dto";


export class UserUpdateDTO extends BaseDTO{
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    public name: string
}