import { IsNotEmpty, IsString } from 'class-validator';

export class loginDTO {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
