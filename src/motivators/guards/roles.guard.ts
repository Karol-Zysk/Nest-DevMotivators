import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Place, Role } from 'src/utils';

@Injectable()
export class RolesGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const place = request.params.place;

    switch (place) {
      case Place.main:
        return true;
      case Place.staging:
        return true;
      case Place.waiting:
        return [Role.moderator, Role.admin].includes(user?.role);
      default:
        return user?.role === Role.admin;
    }
  }
}
