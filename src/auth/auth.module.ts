import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy, RefreshTokenStrategy } from './strategy';
import { UsersModule } from 'src/users/users.module';
import { User } from 'src/entities';

@Module({
  imports: [JwtModule.register({}), UsersModule, AuthModule],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, UsersModule, RefreshTokenStrategy],
})
export class AuthModule {}
