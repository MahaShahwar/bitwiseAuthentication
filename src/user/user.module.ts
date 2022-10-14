import { MiddlewareConsumer, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { userController } from '@User/user.controller';
import { userSchema } from '@User/user.model';
import { userService } from '@User/user.service';
import { AuthModule } from '@Auth/auth.module';
import { LoggerMiddleware } from './user.middleware';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { RolesModule } from '@root/roles/roles.module';
import { rolesSchema } from '@root/roles/roles.schema';
import { permissionsSchema } from '@root/permissions/permissions.schema';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      { name: 'user', schema: userSchema },
      { name: 'Roles', schema: rolesSchema },
      { name: 'Permissions', schema: permissionsSchema },
    ]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1day' },
    }),
  ],
  controllers: [userController],
  providers: [userService],
  exports: [userService, MongooseModule],
})
export class userModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('users', 'product', 'roles', 'permissions');
  }
}
