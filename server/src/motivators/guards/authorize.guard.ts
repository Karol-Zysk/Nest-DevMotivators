import {
  Injectable,
  CanActivate,
  ExecutionContext,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { MotivatorsService } from '../motivators.service';

@Injectable()
export class AuthorizeGuard implements CanActivate {
  constructor(private readonly motivatorsService: MotivatorsService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const motivatorId = request.params.id;
    const user = request.user;

    const motivator = await this.motivatorsService.findMotivatorById(
      motivatorId,
    );

    if (!motivator) {
      throw new NotFoundException(`Motivator with this id doesn't exist`);
    }

    if (motivator.author.toString() !== user._id.toString()) {
      throw new ForbiddenException('Current user is not an author');
    }

    return true;
  }
}
