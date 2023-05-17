import { Injectable, NotFoundException } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { Motivator, MotivatorDocument, User, UserDocument } from 'src/entities';
import { UpdateUserDto } from './dto';
import { InjectModel } from '@nestjs/mongoose';

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

  async getMyMotivators(userId: string): Promise<Motivator[]> {
    return await this.motivatorModel.find({ author: userId });
  }

  async getUserMotivators(userId: string): Promise<Motivator[]> {
    const objectId = new Types.ObjectId(userId);
    const motivators = await this.motivatorModel.find({ author: objectId });

    return motivators;
  }
}
