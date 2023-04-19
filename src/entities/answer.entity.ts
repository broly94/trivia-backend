import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "../config/base.entity";
import { QuestionEntity } from "./question.entity";

@Entity('answer')
export class AnswerEntity extends BaseEntity {

    @Column({
        type: "varchar"
    })
    name: string

    @Column({
        type: 'boolean'
    })
    is_true: boolean

    @ManyToOne(() => QuestionEntity, (question) => question.answers)
    question: QuestionEntity
}