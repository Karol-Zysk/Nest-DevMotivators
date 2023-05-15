import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  UseGuards,
  Query,
} from '@nestjs/common';
import { MotivatorsService } from './motivators.service';
import { CreateMotivatorDto } from './dto/create-motivator.dto';
import { GetUser } from 'src/auth/decorators';
import { User } from 'src/entities';
import { JwtGuard } from 'src/auth/guard';
import { Place } from 'src/utils/enums';
import { QueryString } from 'src/utils/apiFeatures';
import { RolesGuard } from 'src/motivators/guards/roles.guard';

@UseGuards(JwtGuard)
@Controller('motivators')
export class MotivatorsController {
  constructor(private motivatorsService: MotivatorsService) {}

  @UseGuards(RolesGuard)
  @Get('/:place')
  async findAll(
    @Param('place') place: Place,
    @Query() queryString: QueryString,
  ) {
    return this.motivatorsService.findAll(place, queryString);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.motivatorsService.findOne(id);
  }

  @Post()
  async create(@Body() dto: CreateMotivatorDto, @GetUser() user: User) {
    return this.motivatorsService.create(dto, user._id);
  }
}
