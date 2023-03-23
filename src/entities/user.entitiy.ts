import 'reflect-metadata'
import { Column, Entity } from "typeorm";
import bcrypt from 'bcrypt'
import { BaseEntity } from "../config/base.entity";

export enum UserRole {
    ADMIN = "admin",
    USER = "user",
}

@Entity({ name: "user" })
export class UserEntity extends BaseEntity {

    @Column({
        type: "varchar",
        nullable: false,
        unique: true
    })
    name: string

    @Column({
        type: "varchar",
        nullable: false,
        unique: true,
    })
    email: string

    @Column({
        type: "varchar",
        nullable: false,
    })
    password: string

    @Column({
        type: "integer",
        nullable: true,
        default: 0
    })
    points: number

    @Column({
        type: 'enum',
        default: [UserRole.USER],
        enum: UserRole
    })
    role: Enumerator<UserRole> | undefined

    @Column({
        type: "varchar",
        nullable: true, 
        default: null
     })
    resetTokenPassword: string

    hashPassword(password: string): string {
        const salt = bcrypt.genSaltSync(10)
        const pass = bcrypt.hashSync(password, salt)
        return pass
    }
}