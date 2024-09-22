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
exports.PaginationGroupQueryDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const decorators_1 = require("../../../../../common/decorators");
const enums_1 = require("../../../../../common/enums");
const common_1 = require("../../../common");
const employee_module_type_enum_1 = require("../../employee/enums/employee-module-type.enum");
class PaginationGroupQueryDto {
    constructor() {
        this.workScheduleIds = [];
        this.taskIds = [];
        this.projectIds = [];
        this.isSelectAll = false;
        this.page = 1;
        this.take = 20;
        this.q = '';
        this.ids = [];
        this.isDeleted = false;
    }
}
exports.PaginationGroupQueryDto = PaginationGroupQueryDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(employee_module_type_enum_1.EEmployeeModuleType),
    __metadata("design:type", String)
], PaginationGroupQueryDto.prototype, "moduleType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ isArray: true, type: Number }),
    (0, class_validator_1.IsOptional)(),
    (0, decorators_1.TransformArrayStringToNumbers)(),
    (0, class_validator_1.IsInt)({ each: true }),
    (0, class_validator_1.Min)(1, { each: true }),
    __metadata("design:type", Array)
], PaginationGroupQueryDto.prototype, "workScheduleIds", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ isArray: true, type: String }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], PaginationGroupQueryDto.prototype, "taskIds", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ isArray: true, type: String }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], PaginationGroupQueryDto.prototype, "projectIds", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: common_1.BooleanString, default: false }),
    (0, class_validator_1.IsOptional)(),
    (0, decorators_1.TransformStringToBoolean)(),
    __metadata("design:type", Boolean)
], PaginationGroupQueryDto.prototype, "isSelectAll", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Min: 1', default: 1, minimum: 1 }),
    (0, class_validator_1.IsOptional)(),
    (0, decorators_1.TransformStringToNumber)({ defaultVal: 1 }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], PaginationGroupQueryDto.prototype, "page", void 0);
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
], PaginationGroupQueryDto.prototype, "take", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PaginationGroupQueryDto.prototype, "q", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ isArray: true, type: Number }),
    (0, class_validator_1.IsOptional)(),
    (0, decorators_1.TransformArrayStringToNumbers)(),
    (0, class_validator_1.IsInt)({ each: true }),
    (0, class_validator_1.Min)(1, { each: true }),
    __metadata("design:type", Array)
], PaginationGroupQueryDto.prototype, "ids", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: enums_1.EBoolean, default: false }),
    (0, class_validator_1.IsOptional)(),
    (0, decorators_1.TransformStringToBoolean)(),
    __metadata("design:type", Boolean)
], PaginationGroupQueryDto.prototype, "isDeleted", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], PaginationGroupQueryDto.prototype, "createdFrom", void 0);
//# sourceMappingURL=pagination-group-query.dto.js.map