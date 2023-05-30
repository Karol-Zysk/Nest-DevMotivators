import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { SignInDto, SignUpDto } from './dto';
import { RefreshTokenGuard } from './guard';
import { GetUser } from './decorators';
import { User } from 'src/entities';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signUp(
    @Body() dto: SignUpDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<void> {
    return this.authService.signUp(dto, res);
  }

  @Post('signin')
  async signIn(
    @Body() dto: SignInDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.signIn(dto, res);
  }

  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  async refreshTokens(
    @GetUser() user: User,
    @Request() req,
    @Res({ passthrough: true }) res: Response,
  ) {
    const userId = user['sub'];
    const refreshToken = req.cookies['jwt-refresh'];
    return this.authService.refreshTokens(userId, refreshToken, res);
  }

  @UseGuards(RefreshTokenGuard)
  @Get('logout')
  async logout(
    @GetUser() user: User,
    @Res({ passthrough: true }) res: Response,
  ) {
    const userId = user['sub'];
    return this.authService.logout(userId, res);
  }
}
