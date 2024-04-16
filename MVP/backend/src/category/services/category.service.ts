import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  // ---------------------------------------------------
  // Section 1: Create New Categories Into The Database
  createCategory(data: Prisma.categoryCreateInput) {
    return this.prisma.category.create({ data });
  }

  createCategories(data: Prisma.categoryCreateManyInput[]) {
    return this.prisma.category.createMany({ data });
  }

  // ---------------------------------------------------
  // Section 2: Retrieve Categories From The Database
  getCategories() {
    return this.prisma.category.findMany();
  }

  getCategoryById(id: number) {
    return this.prisma.category.findUnique({ where: { id } });
  }

  getCategoryByName(category_name: string) {
    return this.prisma.category.findFirst({ where: { category_name } });
  }

  // ---------------------------------------------------
  // Section 3: Update Categories In The Database
  updateCategory(id: number, data: Prisma.categoryUpdateInput) {
    return this.prisma.category.update({ where: { id }, data });
  }

  // ---------------------------------------------------
  // Section 4: Delete Categories From The Database

  deleteCategory(id: number) {
    return this.prisma.category.delete({ where: { id } });
  }
}
