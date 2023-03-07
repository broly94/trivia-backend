import { Column, Entity, OneToMany } from "typeorm";
import bcrypt from 'bcrypt'
import {  IsEmail, IsEnum, IsInt, IsJWT, IsNotEmpty, IsString, Min, MinLength } from "class-validator";

import { BaseEntity } from "../config/base.entity";
import { RankEntity } from "./rank.entity";

export enum UserRole {
    ADMIN = "admin",
    USER = "user",
}

@Entity({ name: "user" })
export class UserEntity extends BaseEntity {

    @Column({ type: 'varchar' })
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    name: string

    @Column({ type: 'varchar', unique: true })
    @IsEmail()
    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    email: string

    @Column({ type: 'varchar' })
    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    password: string

    @Column({ type: 'integer', default: 0})
    @IsInt()
    @Min(0)
    points: number

    @Column({ type: 'enum', default: [UserRole.USER], enum: UserRole })
    @IsEnum(UserRole)
    role: Enumerator<UserRole> | undefined

    @Column({ type: 'varchar', default: 0 })
    @IsJWT()
    @IsString()
    resetTokenPassword: string

    hashPassword(password: string): string {
        const salt = bcrypt.genSaltSync(10)
        const pass = bcrypt.hashSync(password, salt)
        return pass
    }

    @OneToMany(() => RankEntity, (rank) => rank.users)
    rank: RankEntity
}