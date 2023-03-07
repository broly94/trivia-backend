import { IsInt, IsNotEmpty, Min } from "class-validator";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "../config/base.entity";
import { UserEntity } from './user.entitiy'

@Entity({name: "rank"})
export class RankEntity extends BaseEntity {

    @Column({type: "integer"})
    @IsInt()
    @Min(0)
    @IsNotEmpty()
    user_id: number

    @ManyToOne(() => UserEntity, (user) => user.rank)
    @JoinColumn({name: 'user_id'})
    users: UserEntity
}