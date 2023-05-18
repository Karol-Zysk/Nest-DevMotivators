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
exports.MotivatorSchema = exports.Motivator = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const slugify_1 = require("slugify");
const utils_1 = require("../utils");
let Motivator = class Motivator {
    safeIn() {
        if (this.accepted && this.movedToMain) {
            const safeIn = Number(this.movedToMain) - Number(this.accepted);
            return (0, utils_1.convertMilliseconds)(safeIn);
        }
        return '';
    }
};
__decorate([
    (0, mongoose_1.Prop)({ required: true, maxLength: 40 }),
    __metadata("design:type", String)
], Motivator.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, maxLength: 999 }),
    __metadata("design:type", String)
], Motivator.prototype, "subTitle", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Motivator.prototype, "slug", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Motivator.prototype, "image", void 0);
__decorate([
    (0, mongoose_1.Prop)([{ type: mongoose_2.Types.ObjectId, ref: 'User' }]),
    __metadata("design:type", Array)
], Motivator.prototype, "like", void 0);
__decorate([
    (0, mongoose_1.Prop)([{ type: mongoose_2.Types.ObjectId, ref: 'User' }]),
    __metadata("design:type", Array)
], Motivator.prototype, "dislike", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], Motivator.prototype, "accepted", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], Motivator.prototype, "movedToMain", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        enum: [utils_1.Place.main, utils_1.Place.staging, utils_1.Place.waiting],
        default: utils_1.Place.main,
    }),
    __metadata("design:type", String)
], Motivator.prototype, "place", void 0);
__decorate([
    (0, mongoose_1.Prop)([{ type: String }]),
    __metadata("design:type", Array)
], Motivator.prototype, "keyWords", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Motivator.prototype, "author", void 0);
Motivator = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    })
], Motivator);
exports.Motivator = Motivator;
exports.MotivatorSchema = mongoose_1.SchemaFactory.createForClass(Motivator);
exports.MotivatorSchema.pre('save', function () {
    if (this.isModified('title')) {
        this.slug = (0, slugify_1.default)(this.title, { lower: true });
    }
});
//# sourceMappingURL=motivator.entity.js.map