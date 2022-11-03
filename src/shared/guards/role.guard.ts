import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Roles } from '../enums/roles.enums';

@Injectable()
export class RoleGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const headers = context.switchToHttp().getRequest().headers;
    if (
      (headers.role === 'ADMIN' && headers.role === Roles.ADMIN) ||
      (headers.role === 'SELLER' && headers.role === Roles.SELLER)
    )
      return true;
  }
}
