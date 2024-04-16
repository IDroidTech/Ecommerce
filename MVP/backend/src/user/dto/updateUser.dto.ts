import {
  IsOptional,
  IsString,
  IsEmail,
  MinLength,
  MaxLength,
  Matches,
  IsPhoneNumber,
} from 'class-validator';

export class updateUserDTO {
  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsEmail()
  email_address?: string;

  @IsOptional()
  @MinLength(8)
  @MaxLength(30)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.+[a-z]).*$/, {
    message: 'Password Too Weak',
  })
  password?: string;

  @IsOptional()
  @IsPhoneNumber()
  phone_number?: string;
}
