import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '@Auth/enums/role.enum';
import { ROLES_KEY } from '@Auth/decorator/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {

    //what r the roles we have defined 
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    
    //role of the current user(current user from jwt)
    const { user } = context.switchToHttp().getRequest();
    
    //if the user has one of the defined roles in enum
    return requiredRoles.some((role) => user.roles?.includes(role));
  }
}