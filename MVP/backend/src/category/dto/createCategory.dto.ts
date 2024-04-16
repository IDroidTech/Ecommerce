import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class createCategoryDTO {
  @IsNotEmpty()
  @IsString()
  category_name: string;

  @IsOptional()
  @IsInt()
  parent_category_id?: number;
}
