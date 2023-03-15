import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { QuestionEntity } from "./question.entity";

@Entity('category')
export class CategoryEntity {

    @PrimaryGeneratedColumn('increment')
    id: number

    @Column({
        type: "varchar"
    })
    name: string

    @OneToMany(() => QuestionEntity, (question) => question.category)
    questions: QuestionEntity[]

}