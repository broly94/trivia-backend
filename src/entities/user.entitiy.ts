import { Column, Entity } from "typeorm";
import { BaseEntity } from "./base.entity";

@Entity({name: "user"})
export class UserEntity extends BaseEntity {

    @Column({
        type: "varchar",
        length: 255,
        nullable: false
    })
    name!: string

    @Column({
        type: "varchar",
        length: 255,
        nullable: false
    })
    email!: string

    @Column({
        type: "varchar",
        length: 255,
        nullable: false
    })
    password!: string
}