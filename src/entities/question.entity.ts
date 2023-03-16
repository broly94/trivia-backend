import { Column, Entity, ManyToOne, OneToMany } from "typeorm";

import { LevelTypes } from "../questions/interfaces/question.interfaces";

import { BaseEntity } from "../config/base.entity";
import { AnswerEntity } from "./answer.entity";
import { CategoryEntity } from "./category.entity";


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