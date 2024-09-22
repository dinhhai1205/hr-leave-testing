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
exports.LeaveTypePolicyCreditPagination = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const decorators_1 = require("../../../../../common/decorators");
const pagination_dto_1 = require("../../../../../common/dto/pagination.dto");
const enums_1 = require("../../../../../common/enums");
class LeaveTypePolicyCreditPagination extends pagination_dto_1.PaginationDto {
}
exports.LeaveTypePolicyCreditPagination = LeaveTypePolicyCreditPagination;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: [1, 2, 3], type: [Number] }),
    (0, class_validator_1.IsArray)(),
    (0, decorators_1.TransformArrayStringToNumbers)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], LeaveTypePolicyCreditPagination.prototype, "leavePolicyIds", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: [1, 2, 3], type: [Number] }),
    (0, class_validator_1.IsArray)(),
    (0, decorators_1.TransformArrayStringToNumbers)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], LeaveTypePolicyCreditPagination.prototype, "employeeIds", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'createdOn',
        enum: enums_1.ESortLeaveTypePolicyCreditTrxFields,
    }),
    (0, class_validator_1.IsEnum)(enums_1.ESortLeaveTypePolicyCreditTrxFields),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], LeaveTypePolicyCreditPagination.prototype, "sort", void 0);
//# sourceMappingURL=leave-type-policy-credit-pagination.dto.js.map