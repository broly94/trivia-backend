import { IsInt, IsNotEmpty, IsString } from "class-validator"

export class UserLoginDTO {

    @IsInt()
    @IsNotEmpty()
    id: number
    
    @IsString()
    @IsNotEmpty()
    user: string
    
    @IsString()
    @IsNotEmpty()
    email: string
    
    @IsInt()
    @IsNotEmpty()
    iat: number
    
    @IsInt()
    @IsNotEmpty()
    exp: number

}