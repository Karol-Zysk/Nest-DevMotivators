import { Injectable, NotFoundException } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { Motivator, MotivatorDocument, User, UserDocument } from 'src/entities';
import { UpdateUserDto } from './dto';
import { InjectModel } from '@nestjs/mongoose';
import { MotivatorsStats } from 'src/interfaces/motivators-stats.interface';
import { expCaps } from 'src/utils';

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

  async getUserById(id: string): Promise<User> {
    const user = await this.userModel.findById(id);
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

  async getMotivatorsWithStats(
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

    const result = (await this.motivatorModel.aggregate(agg).exec())[0] || {};

    const motivators = result.motivators || [];
    const exp = (result.likeCount || 0) * 15 + (result.dislikeCount || 0) * 2;

    const { currentLevel, nextLevelExp, nextLevel } = this.calculateLevels(exp);

    await this.updateSeniority(userId, currentLevel);

    const stats = {
      votingStats: {
        likeCount: result.likeCount || 0,
        dislikeCount: result.dislikeCount || 0,
        exp,
        currentLevel,
        nextLevelExp,
        nextLevel,
      },
    };

    return { motivators, stats };
  }

  private calculateLevels(exp: number) {
    const expCapsEntries = Object.entries(expCaps);
    let currentLevel, nextLevelExp, nextLevel;

    for (let i = 0; i < expCapsEntries.length; i++) {
      const [level, cap] = expCapsEntries[i];

      if (exp < cap) {
        nextLevelExp = cap;
        nextLevel = level;
        break;
      }

      currentLevel = level;
    }

    return { currentLevel, nextLevelExp, nextLevel };
  }

  private async updateSeniority(userId: string, currentLevel: string) {
    const objectId = new Types.ObjectId(userId);
    const user = await this.userModel.findOne({ _id: objectId });

    if (user.seniority !== currentLevel) {
      await this.userModel.updateOne(
        { _id: objectId },
        { $set: { seniority: currentLevel } },
      );
    }
  }

  async getUserMotivators(
    userId: string,
  ): Promise<{ motivators: Motivator[]; stats: MotivatorsStats }> {
    return this.getMotivatorsWithStats(userId);
  }

  async getMyMotivators(
    userId: string,
  ): Promise<{ motivators: Motivator[]; stats: MotivatorsStats }> {
    return this.getMotivatorsWithStats(userId);
  }
}
