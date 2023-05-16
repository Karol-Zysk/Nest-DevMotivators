import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { MotivatorsService } from '../motivators.service';

@Injectable()
export class VotingGuard implements CanActivate {
  constructor(private readonly motivatorService: MotivatorsService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const {
      user,
      params: { id },
    } = request;

    const motivator = await this.motivatorService.findMotivatorById(id);

    const like = motivator?.like.includes(user.id);
    const disLike = motivator?.dislike.includes(user.id);

    const voted = like || disLike;

    if (voted) {
      throw new ForbiddenException("You've already voted");
    }

    return true;
  }
}
