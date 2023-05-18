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
exports.UserSchema = exports.User = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const enums_1 = require("../utils/enums");
let User = class User extends mongoose_2.Document {
};
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        maxLength: 40,
    }),
    __metadata("design:type", String)
], User.prototype, "login", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        unique: true,
        lowercase: true,
    }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        select: false,
    }),
    __metadata("design:type", String)
], User.prototype, "hash", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        select: false,
    }),
    __metadata("design:type", String)
], User.prototype, "refreshToken", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        enum: enums_1.Role,
        default: enums_1.Role.user,
    }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        select: false,
        default: true,
    }),
    __metadata("design:type", Boolean)
], User.prototype, "active", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        maxLength: 999,
    }),
    __metadata("design:type", String)
], User.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        default: 'default.jpg',
    }),
    __metadata("design:type", String)
], User.prototype, "userPhoto", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        default: () => Date.now(),
    }),
    __metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], User.prototype, "updatedAt", void 0);
User = __decorate([
    (0, mongoose_1.Schema)()
], User);
exports.User = User;
exports.UserSchema = mongoose_1.SchemaFactory.createForClass(User);
exports.UserSchema.methods.changedPassword = async function (JWTTimestamp) {
    if (this.passwordChangedAt) {
        let changedTimeStamp = this.passwordChangedAt.getTime() / 1000;
        changedTimeStamp = parseInt(changedTimeStamp.toString(), 10);
        return JWTTimestamp < changedTimeStamp;
    }
    return false;
};
//# sourceMappingURL=user.entity.js.map