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
exports.LeaveTypeUpdateMultipleActiveStatusDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const decorators_1 = require("../../../../../common/decorators");
class LeaveTypeUpdateMultipleActiveStatusDto {
    constructor() {
        this.ids = [];
    }
}
exports.LeaveTypeUpdateMultipleActiveStatusDto = LeaveTypeUpdateMultipleActiveStatusDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: [1, 2, 3] }),
    (0, decorators_1.TransformArrayStringToNumbers)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], LeaveTypeUpdateMultipleActiveStatusDto.prototype, "ids", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], LeaveTypeUpdateMultipleActiveStatusDto.prototype, "active", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], LeaveTypeUpdateMultipleActiveStatusDto.prototype, "activeForEss", void 0);
//# sourceMappingURL=leave-type-update-multiple-active-status.dto.js.map