import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "../config/base.entity";
import { AnswerEntity } from "./answer.entity";
import { CategoryEntity } from "./category.entity";

export enum LevelTypes {
    basic = "BASIC",
    medium = "MEDIUM",
    advanced = "ADVANCED"
}

@Entity('question')
export class QuestionEntity extends BaseEntity {

    @Column({
        type: "varchar"
    })
    question: string

    @Column({
        type: "enum",
        enum: LevelTypes,
        default: [LevelTypes.basic]
    })
    level: Enumerator<LevelTypes> | undefined

    @Column({
        type: "decimal"
    })
    points: number

    @ManyToOne(() => CategoryEntity, (category) => category.questions)
    category: CategoryEntity
    
    @OneToMany(() => AnswerEntity, (answer) => answer.question)
    answers: AnswerEntity[]
}