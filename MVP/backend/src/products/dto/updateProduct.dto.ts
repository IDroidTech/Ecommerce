import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class createProductDTO {
  @IsNotEmpty()
  name?: string;

  @IsNotEmpty()
  @IsString()
  description?: string;

  @IsOptional()
  @IsBoolean()
  recommended?: boolean;

  @IsNotEmpty()
  category?: {
    connect: { id: number }; // Replace 'number' with the actual category ID
  };

  @IsNotEmpty()
  brand?: {
    connect: { id: number }; // Replace 'number' with the actual brand ID
  };
}
