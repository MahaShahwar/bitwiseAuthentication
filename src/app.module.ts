import {
  CacheInterceptor,
  CacheModule,
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';

import { AppController } from '@root/app.controller';
import { AppService } from '@root/app.service';
import { AuthModule } from '@root/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { PermissionsModule } from './permissions/permissions.module';
import { ProductModule } from '@root/product/product.module';
import { RolesModule } from './roles/roles.module';
import { RoutesModule } from './routes/routes.module';
import { userModule } from '@root/user/user.module';

@Module({
  imports: [
    userModule,
    MongooseModule.forRoot(process.env.Mongo_URL),
    AuthModule,
    ProductModule,
    RolesModule,
    PermissionsModule,
    RoutesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
