import { Controller, Get, Param, Post, Body, UseGuards } from '@nestjs/common';
import { MotivatorsService } from './motivators.service';
import { CreateMotivatorDto } from './dto/create-motivator.dto';
import { GetUser } from 'src/auth/decorators';
import { User } from 'src/entities';
import { JwtGuard } from 'src/auth/guard';

@UseGuards(JwtGuard)
@Controller('motivators')
export class MotivatorsController {
  constructor(private motivatorsService: MotivatorsService) {}

  @Get()
  async findAll() {
    return await this.motivatorsService.findAll();
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
