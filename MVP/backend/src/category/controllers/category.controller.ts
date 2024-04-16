import { Body, Controller, Post } from '@nestjs/common';
import { CategoryService } from '../services/category.service';
import { createCategoryDTO } from '../dto/createCategory.dto';

@Controller('categories')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  // ---------------------------------------------------
  // Section 1: Create New Categories Into The Database
  @Post('new/category')
  createCategory(@Body() category: createCategoryDTO) {
    return this.categoryService.createCategory(category);
  }

  @Post('new/categories')
  createCategories(@Body() categories: createCategoryDTO[]) {
    return this.categoryService.createCategories(categories);
  }
}
