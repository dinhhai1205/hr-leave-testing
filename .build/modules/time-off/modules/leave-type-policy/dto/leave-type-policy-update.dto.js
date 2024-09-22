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
exports.LeaveTypePolicyUpdateBody = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const enums_1 = require("../../../../../common/enums");
const policy_expire_from_enum_1 = require("../enums/policy-expire-from.enum");
const policy_expire_type_enum_1 = require("../enums/policy-expire-type.enum");
const policy_renew_type_enum_1 = require("../enums/policy-renew-type.enum");
class LeaveTypePolicyUpdateBody {
}
exports.LeaveTypePolicyUpdateBody = LeaveTypePolicyUpdateBody;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], LeaveTypePolicyUpdateBody.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'HELLO' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], LeaveTypePolicyUpdateBody.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'HELLO' }),
    (0, class_validator_1.IsDefined)(),
    __metadata("design:type", String)
], LeaveTypePolicyUpdateBody.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 12 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], LeaveTypePolicyUpdateBody.prototype, "entitlement", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 12 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], LeaveTypePolicyUpdateBody.prototype, "effAfterUnit", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: enums_1.EPolicyEffectiveUOM }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(3),
    __metadata("design:type", Number)
], LeaveTypePolicyUpdateBody.prototype, "effAfterUOM", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: enums_1.EPolicyEffectiveType }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsIn)(Object.values(enums_1.EPolicyEffectiveType), {
        message: 'The property $property must be either "J" or "C".',
    }),
    __metadata("design:type", String)
], LeaveTypePolicyUpdateBody.prototype, "effAfterType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: false }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], LeaveTypePolicyUpdateBody.prototype, "prorateEntitlement", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 1 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], LeaveTypePolicyUpdateBody.prototype, "prorateUnit", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        minimum: 0,
        maximum: 33,
        example: 1,
        description: '0 and 33 means is empty. 32 is last day of every month',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(33),
    __metadata("design:type", Number)
], LeaveTypePolicyUpdateBody.prototype, "creditOnDay", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: false }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], LeaveTypePolicyUpdateBody.prototype, "renewYearly", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: policy_renew_type_enum_1.EPolicyRenewType }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateIf)(o => o.renewYearly === true),
    (0, class_validator_1.IsEnum)(policy_renew_type_enum_1.EPolicyRenewType),
    __metadata("design:type", String)
], LeaveTypePolicyUpdateBody.prototype, "renewType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        minimum: 0,
        maximum: 33,
        example: 1,
        description: '0 and 33 means is empty. 32 is last day of every month',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateIf)(o => o.renewYearly === true && o.renewType === policy_renew_type_enum_1.EPolicyRenewType.PICK_MONTH_DAY),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(33),
    __metadata("design:type", Number)
], LeaveTypePolicyUpdateBody.prototype, "renewOnDay", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        minimum: 1,
        maximum: 12,
        example: 1,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateIf)(o => o.renewYearly === true && o.renewType === policy_renew_type_enum_1.EPolicyRenewType.PICK_MONTH_DAY),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(12),
    __metadata("design:type", Number)
], LeaveTypePolicyUpdateBody.prototype, "renewOnMonth", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: enums_1.EPolicyCarryForwardType }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateIf)(o => o.renewYearly === true),
    (0, class_validator_1.IsEnum)(enums_1.EPolicyCarryForwardType),
    __metadata("design:type", String)
], LeaveTypePolicyUpdateBody.prototype, "cfType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 1 }),
    (0, class_validator_1.ValidateIf)(o => o.renewYearly === true &&
        (o.cfType === enums_1.EPolicyCarryForwardType.DAYS ||
            o.cfType === enums_1.EPolicyCarryForwardType.PERCENTAGE)),
    (0, class_validator_1.Min)(0.1),
    __metadata("design:type", Number)
], LeaveTypePolicyUpdateBody.prototype, "cfUnit", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Carry forward to new leave type' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], LeaveTypePolicyUpdateBody.prototype, "cfLtId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: policy_expire_type_enum_1.EPolicyExpireType }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateIf)(o => o.renewYearly === true),
    (0, class_validator_1.IsEnum)(policy_expire_type_enum_1.EPolicyExpireType),
    __metadata("design:type", String)
], LeaveTypePolicyUpdateBody.prototype, "expireType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        minimum: 0,
        maximum: 33,
        example: 1,
        description: '0 and 33 means is empty. 32 is last day of every month',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateIf)(o => o.renewYearly === true && o.expireType === policy_expire_type_enum_1.EPolicyExpireType.EXPIRE_ON),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(32),
    __metadata("design:type", Number)
], LeaveTypePolicyUpdateBody.prototype, "expireOnDay", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ minimum: 1, maximum: 12, example: 1 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateIf)(o => o.renewYearly === true && o.expireType === policy_expire_type_enum_1.EPolicyExpireType.EXPIRE_ON),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(12),
    __metadata("design:type", Number)
], LeaveTypePolicyUpdateBody.prototype, "expireOnMonth", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: policy_expire_from_enum_1.EPolicyExpireFrom }),
    (0, class_validator_1.ValidateIf)(o => o.renewYearly === true && o.expireType === policy_expire_type_enum_1.EPolicyExpireType.EXPIRE_IN),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], LeaveTypePolicyUpdateBody.prototype, "expireInDays", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: policy_expire_from_enum_1.EPolicyExpireFrom }),
    (0, class_validator_1.ValidateIf)(o => o.renewYearly === true && o.expireType === policy_expire_type_enum_1.EPolicyExpireType.EXPIRE_IN),
    (0, class_validator_1.IsEnum)(policy_expire_from_enum_1.EPolicyExpireFrom),
    __metadata("design:type", String)
], LeaveTypePolicyUpdateBody.prototype, "expireInFrom", void 0);
__decorate([
    (0, swagger_1.ApiHideProperty)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], LeaveTypePolicyUpdateBody.prototype, "updatedBy", void 0);
//# sourceMappingURL=leave-type-policy-update.dto.js.map