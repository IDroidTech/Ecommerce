import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class createManyProductDTO {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsOptional()
  @IsBoolean()
  recommended?: boolean;

  @IsNotEmpty()
  @IsInt()
  category_id: number;

  @IsNotEmpty()
  @IsInt()
  brand_id: number;
}
