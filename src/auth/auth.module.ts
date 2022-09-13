import { forwardRef, Global, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { userModule } from 'src/user/user.module';
import { authService } from 'src/auth/auth.service'
import { LocalStrategy } from 'src/auth/strategy/local.strategy';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/constants';
import { JwtStrategy } from './strategy/jwt.strategy';
import { AuthController } from './auth.controller';

@Global()
@Module({
  imports:[
    forwardRef(()=>userModule),
    PassportModule.register({ defaultStrategy: 'bearer' }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
],
  controllers:[AuthController],
  providers: [authService,LocalStrategy,JwtStrategy],
  exports:[authService,
    PassportModule.register({ defaultStrategy: 'bearer' })
  ]
})
export class AuthModule {}
