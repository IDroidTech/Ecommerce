import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class createUserDTO {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email_address: string;

  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(30)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.+[a-z]).*$/, {
    message: 'Password Too Weak',
  })
  password: string;

  @IsNotEmpty()
  @IsPhoneNumber()
  phone_number: string;

  @IsNotEmpty()
  user_address: {
    create: {
      is_default?: boolean;
      address: {
        create: {
          address_line1: string;
          address_line2: string;
          city: string;
          state: string;
          country: string;
          postal_code: string;
        };
      };
    };
  };
}
