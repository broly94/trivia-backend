import { IsDate, IsNumber, IsOptional } from "class-validator";

export class BaseDTO {

    @IsOptional()
    @IsNumber()
    id: number;

    @IsOptional()
    @IsDate()
    createdAt: Date;

    @IsOptional()
    @IsDate()
    updateAt: Date;

}