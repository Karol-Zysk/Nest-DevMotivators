import { Injectable, NotFoundException } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from 'src/entities';
import { UpdateUserDto } from './dto';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}
  getMe(user: User): User {
    return user;
  }

  async updateMe(userId: Types.ObjectId, dto: UpdateUserDto): Promise<User> {
    let updatedUser: User;

    try {
      updatedUser = await this.userModel.findByIdAndUpdate(
        { _id: userId },
        dto,
        {
          new: true,
          runValidators: true,
        },
      );
    } catch (error) {
      throw error;
    }

    if (!updatedUser) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }

    return updatedUser;
  }

  async deleteMe(userId: Types.ObjectId): Promise<void> {
    await this.userModel.findByIdAndDelete({ _id: userId });

    return;
  }
}
