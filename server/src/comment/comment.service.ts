import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCommentDto } from './dto/create-comment.dto'; // Zdefiniuj to DTO do walidacji danych przychodzących
import {
  Comment,
  CommentDocument,
  Motivator,
  MotivatorDocument,
  User,
  UserDocument,
} from 'src/entities';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name)
    private readonly commentModel: Model<CommentDocument>,
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    @InjectModel(Motivator.name)
    private readonly motivatorModel: Model<MotivatorDocument>,
  ) {}

  async addComment(
    dto: CreateCommentDto,
    user: User,
    id: string,
  ): Promise<Comment> {
    const motivator = await this.motivatorModel.findById(id);
    if (!motivator) {
      throw new NotFoundException(`Motivator with ID ${id} not found`);
    }

    const newComment = new this.commentModel({
      ...dto,
      user: user._id,
      motivator: motivator._id,
    });
    await newComment.save();

    return newComment;
  }
}
