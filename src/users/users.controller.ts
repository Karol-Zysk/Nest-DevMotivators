import { Controller, UseGuards, Get, Patch, Body } from '@nestjs/common';
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

  @Patch('me')
  updatetMe(@GetUser() user: User, @Body() dto: UpdateUserDto) {
    return this.usersService.updateMe(user._id, dto);
  }
}
