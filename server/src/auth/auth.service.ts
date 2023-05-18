import {
  Injectable,
  BadRequestException,
  ConflictException,
  ForbiddenException,
} from '@nestjs/common';
import { SignInDto, SignUpDto } from './dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../entities';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}

  async signUp(
    dto: SignUpDto,
  ): Promise<{ access_token: string; refreshToken: string }> {
    try {
      const userExists = await this.userModel
        .findOne({
          $or: [{ email: dto.email }, { name: dto.login }],
        })
        .exec();
      if (userExists) {
        throw new ConflictException('User already exists');
      }

      const hash = await this.hashData(dto.password);
      const newUser = await this.userModel.create({
        email: dto.email,
        login: dto.login,
        hash,
      });

      const tokens = await this.getTokens(newUser.id, newUser.email);
      await this.updateRefreshToken(newUser.id, tokens.refreshToken);
      return tokens;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async signIn(dto: SignInDto) {
    const user = await this.userModel
      .findOne({ email: dto.email })
      .select('+hash')
      .exec();
    if (!user) throw new BadRequestException('User does not exist');

    const passwordMatches = await bcrypt.compare(dto.password, user.hash);
    if (!passwordMatches)
      throw new BadRequestException('Password is incorrect');
    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }

  async logout(userId: string) {
    await this.userModel
      .findByIdAndUpdate(userId, { refreshToken: null })
      .exec();
    return 'Logged Out';
  }

  hashData(data: string) {
    return bcrypt.hash(data, 10);
  }

  async updateRefreshToken(userId: string, refreshToken: string) {
    const hashedRefreshToken = await this.hashData(refreshToken);
    await this.userModel
      .findByIdAndUpdate(userId, { refreshToken: hashedRefreshToken })
      .exec();
  }

  async getTokens(userId: string, username: string) {
    const [access_token, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
        },
        {
          secret: this.config.get<string>('JWT_SECRET'),
          expiresIn: '3h',
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
        },
        {
          secret: this.config.get<string>('JWT_REFRESH_SECRET'),
          expiresIn: '30d',
        },
      ),
    ]);

    return {
      access_token,
      refreshToken,
    };
  }
  async refreshTokens(userId: string, refreshToken: string) {
    const user = await this.userModel
      .findById(userId)
      .select('+refreshToken')
      .exec();
    if (!user || !user.refreshToken)
      throw new ForbiddenException('Access Denied');
    const refreshTokenMatches = await bcrypt.compare(
      refreshToken,
      user.refreshToken,
    );
    if (!refreshTokenMatches) throw new ForbiddenException('Access Denied');
    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }
}
