import { AuthService } from './auth.service';
import { SignInDto, SignUpDto } from './dto';
import { User } from 'src/entities';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signUp(dto: SignUpDto): Promise<{
        access_token: string;
        refreshToken: string;
    }>;
    signIn(dto: SignInDto): Promise<{
        access_token: string;
        refreshToken: string;
    }>;
    refreshTokens(user: User): Promise<{
        access_token: string;
        refreshToken: string;
    }>;
    logout(user: User): Promise<string>;
}
