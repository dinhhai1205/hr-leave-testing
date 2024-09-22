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
exports.LeaveTypePolicyCreationBody = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const enums_1 = require("../../../../../common/enums");
const policy_expire_from_enum_1 = require("../enums/policy-expire-from.enum");
const policy_expire_type_enum_1 = require("../enums/policy-expire-type.enum");
const policy_renew_type_enum_1 = require("../enums/policy-renew-type.enum");
class LeaveTypePolicyCreationBody {
    constructor() {
        this.prorateEntitlement = false;
        this.prorateUnit = 0;
        this.creditOnDay = 0;
        this.renewYearly = false;
        this.renewType = policy_renew_type_enum_1.EPolicyRenewType.PICK_MONTH_DAY;
        this.renewOnDay = 0;
        this.renewOnMonth = 0;
        this.cfUnit = 0;
        this.cfLtId = 0;
        this.expireType = policy_expire_type_enum_1.EPolicyExpireType.NEVER;
        this.expireOnDay = 0;
        this.expireOnMonth = 0;
    }
}
exports.LeaveTypePolicyCreationBody = LeaveTypePolicyCreationBody;
__decorate([
    (0, swagger_1.ApiHideProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], LeaveTypePolicyCreationBody.prototype, "companyId", void 0);
__decorate([
    (0, swagger_1.ApiHideProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], LeaveTypePolicyCreationBody.prototype, "ltId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'HELLO' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], LeaveTypePolicyCreationBody.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'HELLO' }),
    (0, class_validator_1.MinLength)(1),
    __metadata("design:type", String)
], LeaveTypePolicyCreationBody.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 12 }),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], LeaveTypePolicyCreationBody.prototype, "entitlement", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 12 }),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], LeaveTypePolicyCreationBody.prototype, "effAfterUnit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: enums_1.EPolicyEffectiveUOM }),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(3),
    __metadata("design:type", Number)
], LeaveTypePolicyCreationBody.prototype, "effAfterUOM", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: enums_1.EPolicyEffectiveType }),
    (0, class_validator_1.IsIn)(Object.values(enums_1.EPolicyEffectiveType), {
        message: 'The property $property must be either "J" or "C" or "S".',
    }),
    __metadata("design:type", String)
], LeaveTypePolicyCreationBody.prototype, "effAfterType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: false }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], LeaveTypePolicyCreationBody.prototype, "prorateEntitlement", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], LeaveTypePolicyCreationBody.prototype, "prorateUnit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        minimum: 0,
        maximum: 33,
        example: 1,
        description: '0 and 33 means is empty. 32 is last day of every month',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(33),
    __metadata("design:type", Object)
], LeaveTypePolicyCreationBody.prototype, "creditOnDay", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: false }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], LeaveTypePolicyCreationBody.prototype, "renewYearly", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: policy_renew_type_enum_1.EPolicyRenewType }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateIf)(o => o.renewYearly === true),
    (0, class_validator_1.IsEnum)(policy_renew_type_enum_1.EPolicyRenewType),
    __metadata("design:type", String)
], LeaveTypePolicyCreationBody.prototype, "renewType", void 0);
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
    __metadata("design:type", Object)
], LeaveTypePolicyCreationBody.prototype, "renewOnDay", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ minimum: 1, maximum: 12, example: 1 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateIf)(o => o.renewYearly === true && o.renewType === policy_renew_type_enum_1.EPolicyRenewType.PICK_MONTH_DAY),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(12),
    __metadata("design:type", Object)
], LeaveTypePolicyCreationBody.prototype, "renewOnMonth", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: enums_1.EPolicyCarryForwardType }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(enums_1.EPolicyCarryForwardType),
    __metadata("design:type", String)
], LeaveTypePolicyCreationBody.prototype, "cfType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    (0, class_validator_1.ValidateIf)(o => o.renewYearly === true &&
        (o.cfType === enums_1.EPolicyCarryForwardType.DAYS ||
            o.cfType === enums_1.EPolicyCarryForwardType.PERCENTAGE)),
    (0, class_validator_1.Min)(0.1),
    __metadata("design:type", Object)
], LeaveTypePolicyCreationBody.prototype, "cfUnit", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Carry forward to new leave type' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Object)
], LeaveTypePolicyCreationBody.prototype, "cfLtId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: policy_expire_type_enum_1.EPolicyExpireType }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateIf)(o => o.renewYearly === true),
    (0, class_validator_1.IsEnum)(policy_expire_type_enum_1.EPolicyExpireType),
    __metadata("design:type", String)
], LeaveTypePolicyCreationBody.prototype, "expireType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        minimum: 1,
        maximum: 32,
        example: 1,
        description: '0 and 33 means is empty. 32 is last day of every month',
    }),
    (0, class_validator_1.ValidateIf)(o => o.renewYearly === true && o.expireType === policy_expire_type_enum_1.EPolicyExpireType.EXPIRE_ON),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(33),
    __metadata("design:type", Object)
], LeaveTypePolicyCreationBody.prototype, "expireOnDay", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ minimum: 1, maximum: 12, example: 1 }),
    (0, class_validator_1.ValidateIf)(o => o.renewYearly === true && o.expireType === policy_expire_type_enum_1.EPolicyExpireType.EXPIRE_ON),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(12),
    __metadata("design:type", Object)
], LeaveTypePolicyCreationBody.prototype, "expireOnMonth", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: policy_expire_from_enum_1.EPolicyExpireFrom }),
    (0, class_validator_1.ValidateIf)(o => o.renewYearly === true && o.expireType === policy_expire_type_enum_1.EPolicyExpireType.EXPIRE_IN),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], LeaveTypePolicyCreationBody.prototype, "expireInDays", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: policy_expire_from_enum_1.EPolicyExpireFrom }),
    (0, class_validator_1.ValidateIf)(o => o.renewYearly === true && o.expireType === policy_expire_type_enum_1.EPolicyExpireType.EXPIRE_IN),
    (0, class_validator_1.IsEnum)(policy_expire_from_enum_1.EPolicyExpireFrom),
    __metadata("design:type", String)
], LeaveTypePolicyCreationBody.prototype, "expireInFrom", void 0);
__decorate([
    (0, swagger_1.ApiHideProperty)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], LeaveTypePolicyCreationBody.prototype, "createdBy", void 0);
__decorate([
    (0, swagger_1.ApiHideProperty)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], LeaveTypePolicyCreationBody.prototype, "updatedBy", void 0);
//# sourceMappingURL=leave-type-policy-creation.dto.js.map