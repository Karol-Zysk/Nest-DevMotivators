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
Object.defineProperty(exports, "__esModule", { value: true });
exports.VotingGuard = void 0;
const common_1 = require("@nestjs/common");
const motivators_service_1 = require("../motivators.service");
let VotingGuard = class VotingGuard {
    constructor(motivatorService) {
        this.motivatorService = motivatorService;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const { user, params: { id }, } = request;
        const motivator = await this.motivatorService.findMotivatorById(id);
        const like = motivator === null || motivator === void 0 ? void 0 : motivator.like.includes(user._id);
        const disLike = motivator === null || motivator === void 0 ? void 0 : motivator.dislike.includes(user._id);
        const voted = like || disLike;
        if (voted) {
            throw new common_1.ForbiddenException("You've already voted");
        }
        return true;
    }
};
VotingGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [motivators_service_1.MotivatorsService])
], VotingGuard);
exports.VotingGuard = VotingGuard;
//# sourceMappingURL=voting.guard.js.map