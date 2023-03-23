import { IsInt, IsNotEmpty, IsString, IsEmail } from "class-validator"

export class UserLoginDTO {

    @IsInt()
    @IsNotEmpty()
    id: number
    
    @IsString()
    @IsNotEmpty()
    user: string
    
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string
    
    @IsInt()
    @IsNotEmpty()
    iat: number
    
    @IsInt()
    @IsNotEmpty()
    exp: number

}