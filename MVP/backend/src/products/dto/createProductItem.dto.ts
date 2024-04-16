import { IsNotEmpty, IsNumber, IsPositive, IsUrl } from 'class-validator';

export class createProductItemDTO {
  @IsNotEmpty()
  SKU: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  qty_in_stock: number;

  @IsNotEmpty()
  @IsUrl()
  product_image: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  price: number;

  @IsNotEmpty()
  product: {
    connect: { id: number };
  };

  @IsNotEmpty()
  product_configuration: {
    create: {
      variation_option: {
        connect: { id: number };
      };
    };
  };
}
