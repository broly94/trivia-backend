import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export abstract class BaseEntity {

    @PrimaryGeneratedColumn("increment")
    id!: number;

    @CreateDateColumn({
        name: "created_ad",
        type: "timestamp"
    })
    createdAt!: Date;

    @UpdateDateColumn({
        name: "updated_ad",
        type: "timestamp"
    })
    updateAt!: Date;

}