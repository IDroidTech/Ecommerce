import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  Delete,
  Param,
  HttpException,
  ParseIntPipe,
} from '@nestjs/common';
import { ProductsService } from '../services/products.service';
import { createProductDTO } from '../dto/createProduct.dto';
import { createProductItemDTO } from '../dto/createProductItem.dto';
import { createManyProductDTO } from '../dto/createManyProduct.dto';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}
  // ---------------------------------------------------
  // Section 1: Create New Products Into The Database
  @Post('new/:prod')
  createProductOrProductItem(
    @Param('prod') prod: string,
    @Body()
    product:
      | createProductDTO
      | createManyProductDTO[]
      // | createProductManyItemDTO[]
      | createProductItemDTO,
  ) {
    switch (prod) {
      case 'product':
        return this.productsService.createProduct(product as createProductDTO);
      case 'products':
        return this.productsService.createManyProduct(
          product as createManyProductDTO[],
        );
      case 'product_item':
        return this.productsService.createProductItem(
          product as createProductItemDTO,
        );
      // case 'product_items':
      //   return this.productsService.createManyProduct(
      //     product as unknown as createManyProductItemDTO[],
      //   );
      default:
        throw new HttpException('Invalid URL', 400);
    }
  }

  // ---------------------------------------------------
  // Section 2: Retrieve Products From The Database
  @Get()
  getProductsByQuery(@Query() query: { category?: string; brand?: string }) {
    if (query.category) {
      return this.productsService.getProductsByCategory(query.category);
    }
    if (query.brand) {
      return this.productsService.getProductsByBrand(query.brand);
    }
  }
  @Get(':filter')
  getByFilter(
    @Param('filter') filter: string,
    @Query('limit', ParseIntPipe) limit: number,
  ) {
    switch (filter) {
      case 'discounts':
        if (limit) return this.productsService.getDiscountedProducts(limit);
        return this.productsService.getDiscountedProducts();
      case 'recommended':
        if (limit) return this.productsService.getRecommendedProducts(limit);
        return this.productsService.getRecommendedProducts();
      case 'new':
        if (limit) return this.productsService.getNewProducts(limit);
        return this.productsService.getNewProducts();
      default:
        throw new HttpException('Invalid URL', 400);
    }
  }
  // ---------------------------------------------------
  // Section 3: Update Products In The Database
  // @Patch('item/:SKU')
  // updateProductItem(
  //   @Param('SKU') SKU: string,
  //   @Body() product_item: createProductItemDTO,
  // ) {
  //   return this.productsService.updateProductItem(SKU, product_item);
  // }

  // @Patch('product/:name')
  // updateProduct(
  //   @Param('name') name: string,
  //   @Body() product: createProductDTO,
  // ) {
  //   return this.productsService.updateProduct(name, product);
  // }

  // ---------------------------------------------------
  // Section 4: Delete Products From The Database
  @Delete('item/:SKU')
  deleteProductItem(@Param('SKU') SKU: string) {
    return this.productsService.deleteProductItem(SKU);
  }

  @Delete('product/:name')
  deleteProduct(@Param('name') name: string) {
    return this.productsService.deleteProduct(name);
  }

  // ---------------------------------------------------
  // old code
  // @Post('new/product')
  // createProduct(@Body() product: createProductDTO) {
  //   return this.productsService.createProduct(product);
  // }
  // @Post('new/item')
  // createProductItem(@Body() product_item: createProductItemDTO) {
  //   return this.productsService.createProductItem(product_item);
  // }
  // @Post('new/products')
  // createManyProduct(@Body() products: createManyProductDTO[]) {
  //   return this.productsService.createManyProduct(products);
  // }
  // @Get('discounts')
  // getDiscountedProducts() {
  //   return this.productsService.getDiscountedProducts();
  // }
  // @Get('recommended')
  // getRecommendedProducts() {
  //   return this.productsService.getRecommendedProducts();
  // }
  // @Get('new')
  // getNewProducts() {
  //   return this.productsService.getNewProducts();
  // }
  // @Get('category')
  // getProductsByCategory(@Query('category') category: string) {
  //   return this.productsService.getProductsByCategory(category);
  // }
  // @Get('brand')
  // getProductsByBrand(@Query('brand') brand: string) {
  //   return this.productsService.getProductsByBrand(brand);
  // }
  // ---------------------------------------------------
  // test section
}
