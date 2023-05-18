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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const entities_1 = require("../entities");
const mongoose_2 = require("@nestjs/mongoose");
let UsersService = class UsersService {
    constructor(userModel, motivatorModel) {
        this.userModel = userModel;
        this.motivatorModel = motivatorModel;
    }
    getMe(user) {
        return user;
    }
    async updateMe(userId, dto) {
        const updatedUser = await this.userModel.findByIdAndUpdate({ _id: userId }, dto, {
            new: true,
            runValidators: true,
        });
        if (!updatedUser) {
            throw new common_1.NotFoundException(`User with id ${userId} not found`);
        }
        return updatedUser;
    }
    async deleteMe(userId) {
        await this.userModel.findByIdAndDelete({ _id: userId });
        return;
    }
    async getMyMotivators(userId) {
        return await this.motivatorModel.find({ author: userId });
    }
    async getUserMotivators(userId) {
        const objectId = new mongoose_1.Types.ObjectId(userId);
        const motivators = await this.motivatorModel.find({ author: objectId });
        return motivators;
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(entities_1.User.name)),
    __param(1, (0, mongoose_2.InjectModel)(entities_1.Motivator.name)),
    __metadata("design:paramtypes", [mongoose_1.Model,
        mongoose_1.Model])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map