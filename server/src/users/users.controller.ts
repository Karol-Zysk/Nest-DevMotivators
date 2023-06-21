import {
  Controller,
  UseGuards,
  Get,
  Patch,
  Body,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
} from '@nestjs/common';

import { GetUser } from 'src/auth/decorators';
import { JwtGuard } from 'src/auth/guard';
import { User } from 'src/entities';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto';

@UseGuards(JwtGuard)
@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  getMe(@GetUser() user: User) {
    return this.usersService.getMe(user);
  }

  @Get('/:id')
  getUserById(@Param('id') id: string) {
    return this.usersService.getUserById(id);
  }

  @Patch('me')
  updatetMe(@GetUser() user: User, @Body() dto: UpdateUserDto) {
    return this.usersService.updateMe(user._id, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('me')
  deletetMe(@GetUser() user: User) {
    return this.usersService.deleteMe(user._id);
  }

  @Get('me/motivators')
  getMyMotivators(@GetUser() user: User) {
    return this.usersService.getMyMotivators(user._id);
  }

  @Get('/:id/motivators')
  getUserMotivators(@Param('id') id: string) {
    return this.usersService.getUserMotivators(id);
  }
}
