import { forwardRef, Global, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { userModule } from '@User/user.module';
import { authService } from '@Auth/auth.service'
import { LocalStrategy } from '@Auth/strategy/local.strategy';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { jwtConstants } from '@Auth/constants';
import { JwtStrategy } from '@Auth/strategy/jwt.strategy';
import { AuthController } from '@Auth/auth.controller';
import { RolesGuard } from '@Auth/guards/roles.guard';

@Global()
@Module({
  imports:[
    forwardRef(()=>userModule),
    PassportModule.register({ defaultStrategy: 'bearer' }),
    JwtModule.register({
      secret: process.env.JWT_KEY,
      signOptions: { expiresIn: '60s' },
    }),
],
  controllers:[AuthController],
  providers: [authService,LocalStrategy,JwtStrategy,RolesGuard],
  exports:[authService,
    PassportModule.register({ defaultStrategy: 'bearer' }),
  ]
})
export class AuthModule {}
