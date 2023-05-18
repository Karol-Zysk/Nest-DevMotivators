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
exports.MotivatorsController = void 0;
const common_1 = require("@nestjs/common");
const motivators_service_1 = require("./motivators.service");
const create_motivator_dto_1 = require("./dto/create-motivator.dto");
const decorators_1 = require("../auth/decorators");
const entities_1 = require("../entities");
const guard_1 = require("../auth/guard");
const enums_1 = require("../utils/enums");
const update_motivator_dto_1 = require("./dto/update-motivator.dto");
const guards_1 = require("./guards");
const isPublic_decorator_1 = require("../decorators/isPublic.decorator");
const roles_decorator_1 = require("../decorators/roles.decorator");
let MotivatorsController = class MotivatorsController {
    constructor(motivatorsService) {
        this.motivatorsService = motivatorsService;
    }
    findMotivatorsMain(queryString) {
        return this.motivatorsService.findAllMotivators(enums_1.Place.main, queryString);
    }
    findMotivatorsStaging(queryString) {
        return this.motivatorsService.findAllMotivators(enums_1.Place.staging, queryString);
    }
    findMotivatorsWaiting(queryString) {
        return this.motivatorsService.findAllMotivators(enums_1.Place.waiting, queryString);
    }
    findMotivatorById(id) {
        return this.motivatorsService.findMotivatorById(id);
    }
    createMotivator(dto, user) {
        return this.motivatorsService.createMotivator(dto, user._id);
    }
    async updateMotivator(id, updateMotivatorDto) {
        return this.motivatorsService.updateMotivator(id, updateMotivatorDto);
    }
    async deleteMotivator(id) {
        return this.motivatorsService.deleteMotivator(id);
    }
    doLike(id, user) {
        return this.motivatorsService.vote(id, user._id, enums_1.VoteKind.like, enums_1.VoteMethod.give);
    }
    undoLike(id, user) {
        return this.motivatorsService.vote(id, user._id, enums_1.VoteKind.like, enums_1.VoteMethod.take);
    }
    doUnlike(id, user) {
        return this.motivatorsService.vote(id, user._id, enums_1.VoteKind.dislike, enums_1.VoteMethod.give);
    }
    undoUnlike(id, user) {
        return this.motivatorsService.vote(id, user._id, enums_1.VoteKind.dislike, enums_1.VoteMethod.take);
    }
    acceptToStaging(id) {
        return this.motivatorsService.acceptToStaging(id);
    }
};
__decorate([
    (0, common_1.Get)('/place/main'),
    (0, isPublic_decorator_1.Public)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MotivatorsController.prototype, "findMotivatorsMain", null);
__decorate([
    (0, common_1.Get)('/place/staging'),
    (0, isPublic_decorator_1.Public)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MotivatorsController.prototype, "findMotivatorsStaging", null);
__decorate([
    (0, common_1.Get)('/place/waiting'),
    (0, common_1.UseGuards)(guards_1.RolesGuard),
    (0, roles_decorator_1.Roles)(enums_1.Role.admin, enums_1.Role.moderator),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MotivatorsController.prototype, "findMotivatorsWaiting", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MotivatorsController.prototype, "findMotivatorById", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, decorators_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_motivator_dto_1.CreateMotivatorDto, entities_1.User]),
    __metadata("design:returntype", void 0)
], MotivatorsController.prototype, "createMotivator", null);
__decorate([
    (0, common_1.UseGuards)(guards_1.AuthorizeGuard),
    (0, common_1.Patch)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_motivator_dto_1.UpdateMotivatorDto]),
    __metadata("design:returntype", Promise)
], MotivatorsController.prototype, "updateMotivator", null);
__decorate([
    (0, common_1.UseGuards)(guards_1.AuthorizeGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MotivatorsController.prototype, "deleteMotivator", null);
__decorate([
    (0, common_1.UseGuards)(guards_1.VotingGuard),
    (0, common_1.Put)('/:id/dolike'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, decorators_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, entities_1.User]),
    __metadata("design:returntype", void 0)
], MotivatorsController.prototype, "doLike", null);
__decorate([
    (0, common_1.Put)('/:id/undolike'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, decorators_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, entities_1.User]),
    __metadata("design:returntype", void 0)
], MotivatorsController.prototype, "undoLike", null);
__decorate([
    (0, common_1.UseGuards)(guards_1.VotingGuard),
    (0, common_1.Put)('/:id/dounlike'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, decorators_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, entities_1.User]),
    __metadata("design:returntype", void 0)
], MotivatorsController.prototype, "doUnlike", null);
__decorate([
    (0, common_1.Put)('/:id/undounlike'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, decorators_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, entities_1.User]),
    __metadata("design:returntype", void 0)
], MotivatorsController.prototype, "undoUnlike", null);
__decorate([
    (0, common_1.UseGuards)(guards_1.RolesGuard),
    (0, roles_decorator_1.Roles)(enums_1.Role.admin, enums_1.Role.moderator),
    (0, common_1.Patch)('/:id/accept'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MotivatorsController.prototype, "acceptToStaging", null);
MotivatorsController = __decorate([
    (0, common_1.UseGuards)(guard_1.JwtGuard),
    (0, common_1.Controller)('motivators'),
    __metadata("design:paramtypes", [motivators_service_1.MotivatorsService])
], MotivatorsController);
exports.MotivatorsController = MotivatorsController;
//# sourceMappingURL=motivators.controller.js.map