"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const entities_1 = require("../entities");
let AuthService = class AuthService {
    constructor(userModel, jwtService, config) {
        this.userModel = userModel;
        this.jwtService = jwtService;
        this.config = config;
    }
    async signUp(dto) {
        try {
            const userExists = await this.userModel
                .findOne({
                $or: [{ email: dto.email }, { name: dto.login }],
            })
                .exec();
            if (userExists) {
                throw new common_1.ConflictException('User already exists');
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
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async signIn(dto) {
        const user = await this.userModel
            .findOne({ email: dto.email })
            .select('+hash')
            .exec();
        if (!user)
            throw new common_1.BadRequestException('User does not exist');
        const passwordMatches = await bcrypt.compare(dto.password, user.hash);
        if (!passwordMatches)
            throw new common_1.BadRequestException('Password is incorrect');
        const tokens = await this.getTokens(user.id, user.email);
        await this.updateRefreshToken(user.id, tokens.refreshToken);
        return tokens;
    }
    async logout(userId) {
        await this.userModel
            .findByIdAndUpdate(userId, { refreshToken: null })
            .exec();
        return 'Logged Out';
    }
    hashData(data) {
        return bcrypt.hash(data, 10);
    }
    async updateRefreshToken(userId, refreshToken) {
        const hashedRefreshToken = await this.hashData(refreshToken);
        await this.userModel
            .findByIdAndUpdate(userId, { refreshToken: hashedRefreshToken })
            .exec();
    }
    async getTokens(userId, username) {
        const [access_token, refreshToken] = await Promise.all([
            this.jwtService.signAsync({
                sub: userId,
                username,
            }, {
                secret: this.config.get('JWT_SECRET'),
                expiresIn: '3h',
            }),
            this.jwtService.signAsync({
                sub: userId,
                username,
            }, {
                secret: this.config.get('JWT_REFRESH_SECRET'),
                expiresIn: '30d',
            }),
        ]);
        return {
            access_token,
            refreshToken,
        };
    }
    async refreshTokens(userId, refreshToken) {
        const user = await this.userModel
            .findById(userId)
            .select('+refreshToken')
            .exec();
        if (!user || !user.refreshToken)
            throw new common_1.ForbiddenException('Access Denied');
        const refreshTokenMatches = await bcrypt.compare(refreshToken, user.refreshToken);
        if (!refreshTokenMatches)
            throw new common_1.ForbiddenException('Access Denied');
        const tokens = await this.getTokens(user.id, user.email);
        await this.updateRefreshToken(user.id, tokens.refreshToken);
        return tokens;
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(entities_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        jwt_1.JwtService,
        config_1.ConfigService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map