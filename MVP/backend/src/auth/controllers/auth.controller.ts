import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { loginDTO } from '../dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  login(@Body() data: loginDTO) {
    return this.authService.login(data);
  }

  @Post('register')
  register() {
    return this.authService.register();
  }
}
