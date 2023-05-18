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
exports.AuthorizeGuard = void 0;
const common_1 = require("@nestjs/common");
const motivators_service_1 = require("../motivators.service");
let AuthorizeGuard = class AuthorizeGuard {
    constructor(motivatorsService) {
        this.motivatorsService = motivatorsService;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const motivatorId = request.params.id;
        const user = request.user;
        const motivator = await this.motivatorsService.findMotivatorById(motivatorId);
        if (!motivator) {
            throw new common_1.NotFoundException(`Motivator with this id doesn't exist`);
        }
        if (motivator.author.toString() !== user._id.toString()) {
            throw new common_1.ForbiddenException('Current user is not an author');
        }
        return true;
    }
};
AuthorizeGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [motivators_service_1.MotivatorsService])
], AuthorizeGuard);
exports.AuthorizeGuard = AuthorizeGuard;
//# sourceMappingURL=authorize.guard.js.map