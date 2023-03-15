import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";
import { BaseDTO } from "../../config/base.dto";


export class UserSendEmailForgotPasswordDTO extends BaseDTO{
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    @MinLength(5)
    public email: string
}