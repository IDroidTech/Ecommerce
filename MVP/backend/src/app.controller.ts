import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ProductsService } from './products/services/products.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private products: ProductsService,
  ) {}

  @Get()
  async getProducts() {
    const recommended = await this.products.getDiscountedProducts(20);
    const discounted = await this.products.getRecommendedProducts(20);
    const newArrivals = await this.products.getNewProducts(20);
    return { discounted, newArrivals, recommended };
  }
}
