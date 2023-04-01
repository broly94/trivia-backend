import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";
import { BaseDTO } from "../../config/base.dto";

export class UserCreateDTO extends BaseDTO{
    @IsString()
    @IsNotEmpty()
    public name: string

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    public email: string

    @IsString()
    @IsNotEmpty()
    public password: string
}