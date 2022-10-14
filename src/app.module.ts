import {
  CacheInterceptor,
  CacheModule,
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from '@root/app.controller';
import { AppService } from '@root/app.service';
import { userModule } from '@root/user/user.module';
import { AuthModule } from '@root/auth/auth.module';
import { ProductModule } from '@root/product/product.module';
import { RolesModule } from './roles/roles.module';
import { PermissionsModule } from './permissions/permissions.module';

@Module({
  imports: [
    userModule,
    MongooseModule.forRoot(process.env.Mongo_URL),
    AuthModule,
    ProductModule,
    RolesModule,
    PermissionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
