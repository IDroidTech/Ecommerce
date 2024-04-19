import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/services/user.service';
import { SecurityService } from 'src/security/security.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private securityService: SecurityService,
  ) {}

  async login(data): Promise<string | Error> {
    const user = await this.userService.getUser(data);
    if (user === null)
      throw new HttpException(
        'User Name Or Password Not Correct',
        HttpStatus.UNAUTHORIZED,
      );
    const checkPassword = await this.securityService.comparePassword(
      data.password,
      user.password,
    );
    if (checkPassword) {
      return `JWT Token`;
    } else {
      throw new HttpException(
        'User Name Or Password Not Correct',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  register(): string {
    return `Registered Successfully`;
  }

  logout(): string {
    return `Logged Out Successfully`;
  }

  forgotPassword(): string {
    return `Password Reset Link Sent To Your Email`;
  }
}
