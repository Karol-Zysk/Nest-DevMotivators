import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  BadRequestException,
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
    if (!motivator) throw new BadRequestException('Invalid Motivator Id');

    const like = motivator?.like.includes(user._id);
    const disLike = motivator?.dislike.includes(user._id);

    const voted = like || disLike;

    if (voted) {
      throw new ForbiddenException(
        `You've already ${like ? 'liked' : 'disliked'} this motivator. Click ${
          like ? 'like' : 'dislike'
        }  to undo your vote.`,
      );
    }

    return true;
  }
}
