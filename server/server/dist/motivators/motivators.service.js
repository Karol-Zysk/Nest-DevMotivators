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
exports.MotivatorsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const entities_1 = require("../entities");
const apiFeatures_1 = require("../utils/apiFeatures");
const enums_1 = require("../utils/enums");
let MotivatorsService = class MotivatorsService {
    constructor(motivatorModel) {
        this.motivatorModel = motivatorModel;
    }
    async findAllMotivators(place, queryString) {
        const features = new apiFeatures_1.ApiFeatures(this.motivatorModel.find({ place }), queryString)
            .filter()
            .sort()
            .limitFields()
            .paginate();
        return features.query.exec();
    }
    async findMotivatorById(id) {
        if (!mongoose_2.Types.ObjectId.isValid(id)) {
            throw new common_1.BadRequestException('Invalid ID');
        }
        const motivator = await this.motivatorModel.findById(id).exec();
        if (!motivator) {
            throw new common_1.NotFoundException('Motivator not found');
        }
        return motivator;
    }
    async createMotivator(dto, userId) {
        const createdMotivator = await this.motivatorModel.create(Object.assign({ author: userId }, dto));
        return createdMotivator;
    }
    async updateMotivator(id, updateMotivatorDto) {
        return this.motivatorModel
            .findByIdAndUpdate(id, updateMotivatorDto, { new: true })
            .exec();
    }
    async deleteMotivator(id) {
        const deletedMotivator = await this.motivatorModel
            .findByIdAndDelete(id)
            .exec();
        if (!deletedMotivator) {
            throw new common_1.NotFoundException(`Motivator with ID ${id} not found`);
        }
        return;
    }
    async vote(id, userId, option, method) {
        let motivator = await this.motivatorModel
            .findByIdAndUpdate(id, {
            [`$${method}`]: { [`${option}`]: userId },
            movedToMain: Date.now(),
        }, { new: true, runValidators: true })
            .exec();
        if (motivator && motivator.like.length === 2) {
            motivator = await this.motivatorModel
                .findByIdAndUpdate(id, { place: enums_1.Place.main }, { new: true, runValidators: true })
                .exec();
        }
        return motivator;
    }
    async acceptToStaging(motivatorId) {
        const updatedMotivator = await this.motivatorModel.findByIdAndUpdate(motivatorId, { place: `${enums_1.Place.staging}`, accepted: Date.now() }, { new: true, runValidators: true });
        return updatedMotivator;
    }
};
MotivatorsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(entities_1.Motivator.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], MotivatorsService);
exports.MotivatorsService = MotivatorsService;
//# sourceMappingURL=motivators.service.js.map