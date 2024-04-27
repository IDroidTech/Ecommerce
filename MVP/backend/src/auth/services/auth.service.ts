import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/services/user.service';
import { SecurityService } from 'src/security/security.service';
import { JwtService } from '@nestjs/jwt';
import { loginDTO } from '../dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private securityService: SecurityService,
    private jwtService: JwtService,
  ) {}

  async login(data: loginDTO): Promise<{ access_token: string } | Error> {
    const user = await this.userService.getUser(data);
    if (user === null)
      throw new HttpException(
        'User Name Or Password Not Correct',
        HttpStatus.UNAUTHORIZED,
      );
    const { password, ...userInfo } = user;
    const checkPassword = await this.securityService.comparePassword(
      data.password,
      password,
    );
    if (checkPassword) {
      return { access_token: this.jwtService.sign(userInfo) };
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
