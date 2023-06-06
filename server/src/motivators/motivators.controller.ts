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
} from '@nestjs/common';
import { MotivatorsService } from './motivators.service';
import { CreateMotivatorDto } from './dto/create-motivator.dto';
import { GetUser } from 'src/auth/decorators';
import { User } from 'src/entities';
import { JwtGuard } from 'src/auth/guard';
import { Place, Role, VoteKind, VoteMethod } from 'src/utils/enums';
import { QueryString } from 'src/utils/apiFeatures';
import { UpdateMotivatorDto } from './dto/update-motivator.dto';
import { AuthorizeGuard, RolesGuard, VotingGuard } from './guards';
import { Public } from 'src/decorators/isPublic.decorator';
import { Roles } from 'src/decorators/roles.decorator';

@UseGuards(JwtGuard)
@Controller('motivators')
export class MotivatorsController {
  constructor(private motivatorsService: MotivatorsService) {}

  @Get('/place/main')
  @Public()
  findMotivatorsMain(@Query() queryString: QueryString) {
    return this.motivatorsService.findAllMotivators(Place.main, queryString);
  }

  @Get('/place/staging')
  @Public()
  findMotivatorsStaging(@Query() queryString: QueryString) {
    return this.motivatorsService.findAllMotivators(Place.staging, queryString);
  }

  @Get('/place/waiting')
  @UseGuards(RolesGuard)
  @Roles(Role.admin, Role.moderator)
  findMotivatorsWaiting(@Query() queryString: QueryString) {
    return this.motivatorsService.findAllMotivators(Place.waiting, queryString);
  }

  @Get('/:id')
  findMotivatorById(@Param('id') id: string) {
    return this.motivatorsService.findMotivatorById(id);
  }

  @Post()
  createMotivator(@Body() dto: CreateMotivatorDto, @GetUser() user: User) {
    return this.motivatorsService.createMotivator(dto, user);
  }

  @UseGuards(AuthorizeGuard)
  @Patch('/:id')
  async updateMotivator(
    @Param('id') id: string,
    @Body() updateMotivatorDto: UpdateMotivatorDto,
  ) {
    return this.motivatorsService.updateMotivator(id, updateMotivatorDto);
  }

  // @UseGuards(AuthorizeGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/:id')
  async deleteMotivator(@Param('id') id: string) {
    return this.motivatorsService.deleteMotivator(id);
  }

  @UseGuards(VotingGuard)
  @Patch('/:id/dolike')
  doLike(@Param('id') id: string, @GetUser() user: User) {
    return this.motivatorsService.vote(
      id,
      user._id,
      VoteKind.like,
      VoteMethod.give,
    );
  }

  @Patch('/:id/undolike')
  undoLike(@Param('id') id: string, @GetUser() user: User) {
    return this.motivatorsService.vote(
      id,
      user._id,
      VoteKind.like,
      VoteMethod.take,
    );
  }

  @UseGuards(VotingGuard)
  @Patch('/:id/dounlike')
  doUnlike(@Param('id') id: string, @GetUser() user: User) {
    return this.motivatorsService.vote(
      id,
      user._id,
      VoteKind.dislike,
      VoteMethod.give,
    );
  }

  @Patch('/:id/undounlike')
  undoUnlike(@Param('id') id: string, @GetUser() user: User) {
    return this.motivatorsService.vote(
      id,
      user._id,
      VoteKind.dislike,
      VoteMethod.take,
    );
  }

  @UseGuards(RolesGuard)
  @Roles(Role.admin, Role.moderator)
  @Patch('/:id/accept')
  acceptToStaging(@Param('id') id: string) {
    return this.motivatorsService.acceptToStaging(id);
  }
}
