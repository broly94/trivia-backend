import { IsEmail, IsEnum, IsInt, IsJWT, IsNotEmpty, IsOptional, IsString, Min, MinLength } from "class-validator";
import { BaseDTO } from "../../config/base.dto";
import { UserRole } from "../../entities/user.entitiy";

export class UserDTO extends BaseDTO {

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

    @IsInt()
    @IsOptional()
    @Min(0)
    public points: number

    @IsEnum(UserRole)
    @IsOptional()
    public role: Enumerator<UserRole> | undefined

    @IsString()
    @IsOptional()
    @IsJWT()
    public resetTokenPassword: string

}