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
exports.LeaveTypePagination = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const decorators_1 = require("../../../../../common/decorators");
const pagination_dto_1 = require("../../../../../common/dto/pagination.dto");
const enums_1 = require("../../../../../common/enums");
class LeaveTypePagination extends pagination_dto_1.PaginationDto {
    constructor() {
        super(...arguments);
        this.isParent = enums_1.EBoolean.TRUE;
    }
}
exports.LeaveTypePagination = LeaveTypePagination;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'createdOn',
    }),
    (0, class_validator_1.IsEnum)(enums_1.ESortLeaveTypeFields),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], LeaveTypePagination.prototype, "sort", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: false }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    (0, decorators_1.TransformStringToBoolean)(),
    __metadata("design:type", Boolean)
], LeaveTypePagination.prototype, "active", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: false }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    (0, decorators_1.TransformStringToBoolean)(),
    __metadata("design:type", Boolean)
], LeaveTypePagination.prototype, "calendarView", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: enums_1.EBoolean }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(enums_1.EBoolean),
    __metadata("design:type", String)
], LeaveTypePagination.prototype, "isParent", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        type: Boolean,
        description: `When isDropDownMode is true:
     - Default isDropDownMode is false
     - Fields will be return are: id, name, color, isSpecial, parentId, createdOn
     - All Parent and children will be return
    `,
    }),
    (0, decorators_1.TransformStringToBoolean)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], LeaveTypePagination.prototype, "isDropDownMode", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, decorators_1.TransformStringToBoolean)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], LeaveTypePagination.prototype, "isSpecial", void 0);
//# sourceMappingURL=leave-type-pagination.dto.js.map