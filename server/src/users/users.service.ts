import { Injectable, NotFoundException } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { Motivator, MotivatorDocument, User, UserDocument } from 'src/entities';
import { UpdateUserDto } from './dto';
import { InjectModel } from '@nestjs/mongoose';
import { MotivatorsStats } from 'src/interfaces/motivators-stats.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    @InjectModel(Motivator.name)
    private readonly motivatorModel: Model<MotivatorDocument>,
  ) {}
  getMe(user: User): User {
    return user;
  }

  async updateMe(userId: Types.ObjectId, dto: UpdateUserDto): Promise<User> {
    const updatedUser = await this.userModel.findByIdAndUpdate(
      { _id: userId },
      dto,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updatedUser) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }

    return updatedUser;
  }

  async deleteMe(userId: Types.ObjectId): Promise<void> {
    await this.userModel.findByIdAndDelete({ _id: userId });

    return;
  }

  async aggregateMotivators(
    userId: string,
  ): Promise<{ motivators: Motivator[]; stats: MotivatorsStats }> {
    const objectId = new Types.ObjectId(userId);

    const agg = [
      { $match: { author: objectId } },
      {
        $group: {
          _id: null,
          motivators: { $push: '$$ROOT' },
          likeCount: { $sum: { $size: '$like' } },
          dislikeCount: { $sum: { $size: '$dislike' } },
        },
      },
    ];

    const result = await this.motivatorModel.aggregate(agg).exec();
    const motivators = result[0].motivators;
    const stats = {
      votingStats: {
        likeCount: result[0].likeCount,
        dislikeCount: result[0].dislikeCount,
      },
    };

    return { motivators, stats };
  }

  async getUserMotivators(
    userId: string,
  ): Promise<{ motivators: Motivator[]; stats: MotivatorsStats }> {
    return this.aggregateMotivators(userId);
  }

  async getMyMotivators(
    userId: string,
  ): Promise<{ motivators: Motivator[]; stats: MotivatorsStats }> {
    return await this.aggregateMotivators(userId);
  }
}
