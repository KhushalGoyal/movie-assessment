import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { intersection } from 'lodash';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    return true;
    // const roles = this.reflector.get('roles', context.getHandler());
    // if (!roles) {
    //   return false;
    // }
    // const request = context.switchToHttp().getRequest();
    // const user = request.user;
    // return this.matchRoles(roles, user.roles);
  }

  matchRoles (roles: Array<string>, userRoles: Array<string>) : boolean { 
    return intersection(roles, userRoles).length > 0
  }
}