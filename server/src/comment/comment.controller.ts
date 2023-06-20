import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentService } from './comment.service';
import { JwtGuard } from 'src/auth/guard';
import { GetUser } from 'src/auth/decorators';
import { User } from 'src/entities';

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post(':id')
  @UseGuards(JwtGuard)
  async addComment(
    @Body() dto: CreateCommentDto,
    @GetUser() user: User,
    @Param('id') id: string,
  ) {
    const comment = await this.commentService.addComment(dto, user, id);
    return comment;
  }
}
