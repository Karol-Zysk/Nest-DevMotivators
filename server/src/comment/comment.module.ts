import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Comment, CommentSchema } from 'src/entities';
import { UsersModule } from 'src/users/users.module';
import { MotivatorsModule } from 'src/motivators/motivators.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Comment.name,
        schema: CommentSchema,
      },
    ]),
    MotivatorsModule,
    UsersModule,
  ],
  providers: [CommentService],
  controllers: [CommentController],
  exports: [MongooseModule],
})
export class CommentModule {}
