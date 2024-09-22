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
exports.AssigneesProjectQueryDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const decorators_1 = require("../../../../../common/decorators");
class AssigneesProjectQueryDto {
    constructor() {
        this.page = 1;
        this.take = 20;
        this.q = '';
    }
}
exports.AssigneesProjectQueryDto = AssigneesProjectQueryDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Min: 1', default: 1, minimum: 1 }),
    (0, class_validator_1.IsOptional)(),
    (0, decorators_1.TransformStringToNumber)({ defaultVal: 1 }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], AssigneesProjectQueryDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Min: 1 - Max: 100',
        default: 20,
        maximum: 100,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, decorators_1.TransformStringToNumber)({ defaultVal: 20 }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(100),
    __metadata("design:type", Number)
], AssigneesProjectQueryDto.prototype, "take", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AssigneesProjectQueryDto.prototype, "q", void 0);
//# sourceMappingURL=assignees-project-query.dto.js.map