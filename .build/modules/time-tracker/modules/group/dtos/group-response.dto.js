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
exports.GroupResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("../../../common");
class GroupResponseDto extends common_1.BaseEntityResponseDto {
}
exports.GroupResponseDto = GroupResponseDto;
__decorate([
    (0, swagger_1.ApiResponseProperty)(),
    __metadata("design:type", String)
], GroupResponseDto.prototype, "workScheduleId", void 0);
__decorate([
    (0, swagger_1.ApiResponseProperty)(),
    __metadata("design:type", String)
], GroupResponseDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiResponseProperty)(),
    __metadata("design:type", String)
], GroupResponseDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiResponseProperty)(),
    __metadata("design:type", Boolean)
], GroupResponseDto.prototype, "active", void 0);
__decorate([
    (0, swagger_1.ApiResponseProperty)(),
    __metadata("design:type", Array)
], GroupResponseDto.prototype, "members", void 0);
//# sourceMappingURL=group-response.dto.js.map