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
exports.ColumnCustomizeV2Dto = exports.ExcelJSColumnDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class ExcelJSColumnDto {
}
exports.ExcelJSColumnDto = ExcelJSColumnDto;
class ColumnCustomizeV2Dto {
    constructor() {
        this.mergeColumnKeys = [];
        this.projection = {};
    }
}
exports.ColumnCustomizeV2Dto = ColumnCustomizeV2Dto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ isArray: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], ColumnCustomizeV2Dto.prototype, "columns", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: [String], isArray: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], ColumnCustomizeV2Dto.prototype, "mergeColumnKeys", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: Object }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], ColumnCustomizeV2Dto.prototype, "projection", void 0);
//# sourceMappingURL=column-customize.dto.js.map