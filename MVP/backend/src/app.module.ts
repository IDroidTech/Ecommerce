import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ProductsModule } from './products/products.module';
import { CategoryModule } from './category/category.module';
import { SecurityModule } from './security/security.module';

@Module({
  imports: [AuthModule, UserModule, ProductsModule, CategoryModule, SecurityModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
