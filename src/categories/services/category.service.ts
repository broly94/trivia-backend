import { Repository } from "typeorm";
import { CategoryEntity } from "../../entities/category.entity";

export class CategoryService {

    constructor(private categoryRepository: Repository<CategoryEntity>) { }

    /**
     * Called by getCategory in controller
     * This func return all the categories   
     * @returns Categories
     */

    async getAllCategory() {
        return await this.categoryRepository.find()
    }

}