import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  login(): string {
    return `Login Successfully`;
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

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 14);
  }

  async comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}
