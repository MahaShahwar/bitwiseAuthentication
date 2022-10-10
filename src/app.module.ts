import { CacheInterceptor, CacheModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from '@root/app.controller';
import { AppService } from '@root/app.service';
import { userModule } from '@root/user/user.module';
import { AuthModule } from '@root/auth/auth.module';
import { ProductModule } from '@root/product/product.module';
import * as redisStore from 'cache-manager-redis-store';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [
    userModule,
    MongooseModule.forRoot(process.env.Mongo_URL),
    AuthModule,
    ProductModule,
    //Importing cache
    // CacheModule.register({
    //   store: redisStore,
    //   socket: {
    //     host: 'localhost',
    //     port: 6379,
    //   },
    // }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // //Auto caching(automatically store all the services in cache)
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: CacheInterceptor,
    // },
  ],
})
export class AppModule {}
