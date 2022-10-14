import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { InjectModel } from '@nestjs/mongoose';
import { user } from '@root/user/user.model';
import { Model } from 'mongoose';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @InjectModel('user') private readonly userModel: Model<user>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    //role of the current user(current user from jwt)
    const { user } = context.switchToHttp().getRequest();
    const { originalUrl } = context.switchToHttp().getRequest();

    if (user.roles.includes(originalUrl)) {
      return true;
    } else {
      return false;
    }
  }
}
