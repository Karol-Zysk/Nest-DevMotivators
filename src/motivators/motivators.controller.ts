import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  UseGuards,
  Query,
  Patch,
  Delete,
  HttpCode,
  HttpStatus,
  Put,
} from '@nestjs/common';
import { MotivatorsService } from './motivators.service';
import { CreateMotivatorDto } from './dto/create-motivator.dto';
import { GetUser } from 'src/auth/decorators';
import { User } from 'src/entities';
import { JwtGuard } from 'src/auth/guard';
import { Place, VoteKind, VoteMethod } from 'src/utils/enums';
import { QueryString } from 'src/utils/apiFeatures';
import { RolesGuard } from 'src/motivators/guards/roles.guard';
import { AuthorizeGuard } from './guards/authorize.guard';
import { UpdateMotivatorDto } from './dto/update-motivator.dto';
import { VotingGuard } from './guards/voting.guard';

@UseGuards(JwtGuard)
@Controller('motivators')
export class MotivatorsController {
  constructor(private motivatorsService: MotivatorsService) {}

  @UseGuards(RolesGuard)
  @Get('/place/:place')
  async findAllMotivators(
    @Param('place') place: Place,
    @Query() queryString: QueryString,
  ) {
    return this.motivatorsService.findAllMotivators(place, queryString);
  }

  @Get(':id')
  async findMotivatorById(@Param('id') id: string) {
    return await this.motivatorsService.findMotivatorById(id);
  }

  @Post()
  async createMotivator(
    @Body() dto: CreateMotivatorDto,
    @GetUser() user: User,
  ) {
    return this.motivatorsService.createMotivator(dto, user._id);
  }

  @UseGuards(AuthorizeGuard)
  @Patch('/:id')
  async updateMotivator(
    @Param('id') id: string,
    @Body() updateMotivatorDto: UpdateMotivatorDto,
  ) {
    return this.motivatorsService.updateMotivator(id, updateMotivatorDto);
  }

  @UseGuards(AuthorizeGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/:id')
  async deleteMotivator(@Param('id') id: string) {
    return this.motivatorsService.deleteMotivator(id);
  }

  @UseGuards(VotingGuard)
  @Put('/:id/dolike')
  async doLike(@Param('id') id: string, @GetUser() user: User) {
    console.log(user);
    return this.motivatorsService.vote(
      id,
      user._id,
      VoteKind.like,
      VoteMethod.give,
    );
  }

  @UseGuards(VotingGuard)
  @Patch('/:id/undolike')
  async undoLike(@Param('id') id: string, @GetUser() user: User) {
    return this.motivatorsService.vote(
      id,
      user.id,
      VoteKind.like,
      VoteMethod.take,
    );
  }

  @UseGuards(VotingGuard)
  @Patch('/:id/dounlike')
  async doUnlike(@Param('id') id: string, @GetUser() user: User) {
    return this.motivatorsService.vote(
      id,
      user.id,
      VoteKind.dislike,
      VoteMethod.give,
    );
  }

  @UseGuards(VotingGuard)
  @Patch('/:id/undounlike')
  async undoUnlike(@Param('id') id: string, @GetUser() user: User) {
    return this.motivatorsService.vote(
      id,
      user.id,
      VoteKind.dislike,
      VoteMethod.take,
    );
  }
}
