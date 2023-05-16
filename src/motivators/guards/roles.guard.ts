import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const place = request.params.place;

    switch (place) {
      case 'main':
        return true;
      case 'staging':
        return true;
      case 'waiting':
        return ['moderator', 'admin'].includes(user?.role);
      default:
        return false;
    }
  }
}
