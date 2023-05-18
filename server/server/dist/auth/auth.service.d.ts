import { SignInDto, SignUpDto } from './dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Model } from 'mongoose';
import { UserDocument } from '../entities';
export declare class AuthService {
    private userModel;
    private jwtService;
    private config;
    constructor(userModel: Model<UserDocument>, jwtService: JwtService, config: ConfigService);
    signUp(dto: SignUpDto): Promise<{
        access_token: string;
        refreshToken: string;
    }>;
    signIn(dto: SignInDto): Promise<{
        access_token: string;
        refreshToken: string;
    }>;
    logout(userId: string): Promise<string>;
    hashData(data: string): Promise<string>;
    updateRefreshToken(userId: string, refreshToken: string): Promise<void>;
    getTokens(userId: string, username: string): Promise<{
        access_token: string;
        refreshToken: string;
    }>;
    refreshTokens(userId: string, refreshToken: string): Promise<{
        access_token: string;
        refreshToken: string;
    }>;
}
