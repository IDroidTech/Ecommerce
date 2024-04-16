import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { product, product_item } from '@prisma/client';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  // ---------------------------------------------------
  // Section 1: Create New Products Into The Database
  async createProduct(data: Prisma.productCreateInput) {
    const product = await this.prisma.product.create({ data });
    return { msg: 'added', product };
  }

  createProductItem(
    data: Prisma.product_itemCreateInput,
  ): Promise<product_item | null> {
    return this.prisma.product_item.create({ data });
  }

  // ---------------------------------------------------
  // Section 2: Retrieve Products From The Database
  getRecommendedProducts(limit?: number) {
    return this.prisma.product.findMany({
      where: { recommended: true },
      select: {
        name: true,
        description: true,
        product_item: {
          select: {
            product_image: true,
            product_configuration: {
              select: {
                variation_option: {
                  select: {
                    value: true,
                    variation: {
                      select: {
                        name: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
        brand: {
          select: {
            brand_name: true,
          },
        },
        category: {
          select: {
            category_name: true,
            parent_category: { select: { category_name: true } },
          },
        },
      },
      take: limit,
    });
  }

  getDiscountedProducts(limit?: number) {
    return this.prisma.product_promotion.findMany({
      where: { promotion: { discount: { gt: 0 } } },
      select: {
        product: {
          select: {
            name: true,
            description: true,
            product_item: {
              select: {
                product_image: true,
                product_configuration: {
                  select: {
                    variation_option: {
                      select: {
                        value: true,
                        variation: {
                          select: {
                            name: true,
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
            brand: {
              select: {
                brand_name: true,
              },
            },
            category: {
              select: {
                category_name: true,
                parent_category: { select: { category_name: true } },
              },
            },
          },
        },
      },
      take: limit,
    });
  }

  getNewProducts(limit?: number) {
    return this.prisma.product.findMany({
      orderBy: { created_at: 'desc' },
      select: {
        name: true,
        description: true,
        product_item: {
          select: {
            product_image: true,
            product_configuration: {
              select: {
                variation_option: {
                  select: {
                    value: true,
                    variation: {
                      select: {
                        name: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
        brand: {
          select: {
            brand_name: true,
          },
        },
        category: {
          select: {
            category_name: true,
            parent_category: { select: { category_name: true } },
          },
        },
      },
      take: limit,
    });
  }

  async getProductsByCategory(category: string) {
    const findCategory = await this.prisma.category.findFirst({
      where: { category_name: category },
    });
    if (!findCategory) throw new HttpException('Category not found', 404);
    return this.prisma.product.findMany({
      where: {
        category: {
          category_name: category,
        },
      },
      select: {
        name: true,
        description: true,
        product_item: {
          select: {
            product_image: true,
            product_configuration: {
              select: {
                variation_option: {
                  select: {
                    value: true,
                    variation: {
                      select: {
                        name: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
        brand: {
          select: {
            brand_name: true,
          },
        },
        category: {
          select: {
            category_name: true,
            parent_category: { select: { category_name: true } },
          },
        },
      },
    });
  }

  async getProductsByBrand(brand: string) {
    const findBrand = await this.prisma.brand.findFirst({
      where: { brand_name: brand },
    });
    if (!findBrand) throw new HttpException('Brand not found', 404);
    return this.prisma.product.findMany({
      where: {
        brand: {
          brand_name: brand,
        },
      },
      select: {
        name: true,
        description: true,
        product_item: {
          select: {
            product_image: true,
            product_configuration: {
              select: {
                variation_option: {
                  select: {
                    value: true,
                    variation: {
                      select: {
                        name: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
        brand: {
          select: {
            brand_name: true,
          },
        },
        category: {
          select: {
            category_name: true,
            parent_category: { select: { category_name: true } },
          },
        },
      },
    });
  }

  // ---------------------------------------------------
  // Section 3: Update Product Information In The Database

  // ---------------------------------------------------
  // Section 4: Delete Product Information From The Database
  async deleteProductItem(SKU: string): Promise<product_item | Error> {
    return this.prisma.product_item.delete({ where: { SKU } });
  }

  async deleteProduct(name: string): Promise<product | Error> {
    const product = await this.prisma.product.findFirst({ where: { name } });
    if (!product) throw new HttpException('Product not found', 404);
    return this.prisma.product.delete({ where: { id: product.id } });
  }

  // ---------------------------------------------------
  // Test Section
  createManyProduct(
    data: Prisma.productCreateManyInput[],
  ): Promise<Prisma.BatchPayload> {
    return this.prisma.product.createMany({
      data,
      skipDuplicates: true,
    });
  }
}
