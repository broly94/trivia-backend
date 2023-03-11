import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";
import { BaseDTO } from "../../config/base.dto";

export class UserCreateDTO extends BaseDTO{
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    public name: string

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    @MinLength(5)
    public email: string

    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    public password: string
}