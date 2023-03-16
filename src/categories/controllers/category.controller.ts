import { CategoryService } from "../services/category.service";
import { myDataSource } from '../../config/database'
import { CategoryEntity } from "../../entities/category.entity";
import { NextFunction, Request, Response } from "express";

export class CategoryController extends CategoryService {

    constructor() {
        super(myDataSource.getRepository(CategoryEntity))
    }

    async getCategory(req: Request, res: Response) {
        try {
            const category = await this.getAllCategory()
            if (!category) return res.status(404).json({ message: "Category not found", error: true })

            return res.status(200).json({
                category,
                error: false
            })
        } catch (error) {
            return res.status(404).json({ message: error, error: true })
        }
    }

}