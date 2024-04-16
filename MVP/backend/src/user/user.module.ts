import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthService } from 'src/auth/services/auth.service';

@Module({
  imports: [PrismaModule],
  providers: [UserService, AuthService],
  controllers: [UserController],
})
export class UserModule {}
