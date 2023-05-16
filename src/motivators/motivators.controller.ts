import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  UseGuards,
  Query,
  Patch,
} from '@nestjs/common';
import { MotivatorsService } from './motivators.service';
import { CreateMotivatorDto } from './dto/create-motivator.dto';
import { GetUser } from 'src/auth/decorators';
import { User } from 'src/entities';
import { JwtGuard } from 'src/auth/guard';
import { Place } from 'src/utils/enums';
import { QueryString } from 'src/utils/apiFeatures';
import { RolesGuard } from 'src/motivators/guards/roles.guard';
import { AuthorizeGuard } from './guards/authorize.guard';
import { UpdateMotivatorDto } from './dto/update-motivator.dto';

@UseGuards(JwtGuard)
@Controller('motivators')
export class MotivatorsController {
  constructor(private motivatorsService: MotivatorsService) {}

  @UseGuards(RolesGuard)
  @Get('/:place')
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
}
