import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../../entities';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private config: ConfigService,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: { sub: string; email: string }) {
    try {
      const { sub: id } = payload;
      const user = await this.userModel.findById(id).exec();

      if (!user) {
        throw new UnauthorizedException(`Unauthorized`);
      }

      const userObject = user.toObject();
      delete userObject.hash;

      return userObject;
    } catch (error) {
      throw new UnauthorizedException(`Unauthorized`);
    }
  }
}
