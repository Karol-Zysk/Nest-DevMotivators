import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from './user.entity';
import { Motivator } from './motivator.entity';

export type CommentDocument = Comment & Document;

@Schema()
export class Comment {
  @Prop({ required: true })
  comment: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: User;

  @Prop({
    type: Types.ObjectId,
    ref: 'Motivator',
    required: true,
  })
  motivator: Motivator;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
