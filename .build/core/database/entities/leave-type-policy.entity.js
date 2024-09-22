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
exports.LeaveTypePolicyEntity = void 0;
const typeorm_1 = require("typeorm");
const enums_1 = require("../../../common/enums");
const policy_expire_from_enum_1 = require("../../../modules/time-off/modules/leave-type-policy/enums/policy-expire-from.enum");
const policy_expire_type_enum_1 = require("../../../modules/time-off/modules/leave-type-policy/enums/policy-expire-type.enum");
const policy_renew_type_enum_1 = require("../../../modules/time-off/modules/leave-type-policy/enums/policy-renew-type.enum");
const constants_1 = require("../constants");
const enums_2 = require("../enums");
const abstract_entity_1 = require("./abstract.entity");
const company_entity_1 = require("./company.entity");
const leave_type_policy_credit_entity_1 = require("./leave-type-policy-credit.entity");
const leave_type_entity_1 = require("./leave-type.entity");
let LeaveTypePolicyEntity = class LeaveTypePolicyEntity extends abstract_entity_1.AbstractEntity {
};
exports.LeaveTypePolicyEntity = LeaveTypePolicyEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    __metadata("design:type", Number)
], LeaveTypePolicyEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], LeaveTypePolicyEntity.prototype, "companyId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], LeaveTypePolicyEntity.prototype, "ltId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], LeaveTypePolicyEntity.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], LeaveTypePolicyEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(constants_1.NUMERIC_COLUMN_TYPE),
    __metadata("design:type", Number)
], LeaveTypePolicyEntity.prototype, "effAfterUnit", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], LeaveTypePolicyEntity.prototype, "effAfterUOM", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], LeaveTypePolicyEntity.prototype, "effAfterType", void 0);
__decorate([
    (0, typeorm_1.Column)(constants_1.NUMERIC_COLUMN_TYPE),
    __metadata("design:type", Number)
], LeaveTypePolicyEntity.prototype, "entitlement", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], LeaveTypePolicyEntity.prototype, "prorateEntitlement", void 0);
__decorate([
    (0, typeorm_1.Column)(constants_1.NUMERIC_COLUMN_TYPE),
    __metadata("design:type", Number)
], LeaveTypePolicyEntity.prototype, "prorateUnit", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], LeaveTypePolicyEntity.prototype, "creditOnDay", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], LeaveTypePolicyEntity.prototype, "renewYearly", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], LeaveTypePolicyEntity.prototype, "renewType", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], LeaveTypePolicyEntity.prototype, "renewOnDay", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], LeaveTypePolicyEntity.prototype, "renewOnMonth", void 0);
__decorate([
    (0, typeorm_1.Column)(constants_1.NUMERIC_COLUMN_TYPE),
    __metadata("design:type", Number)
], LeaveTypePolicyEntity.prototype, "cfUnit", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], LeaveTypePolicyEntity.prototype, "cfType", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], LeaveTypePolicyEntity.prototype, "cfLtId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], LeaveTypePolicyEntity.prototype, "expireType", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], LeaveTypePolicyEntity.prototype, "expireInDays", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], LeaveTypePolicyEntity.prototype, "expireInFrom", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], LeaveTypePolicyEntity.prototype, "expireOnDay", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], LeaveTypePolicyEntity.prototype, "expireOnMonth", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], LeaveTypePolicyEntity.prototype, "previousPolicySetting", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => company_entity_1.CompanyEntity),
    (0, typeorm_1.JoinColumn)({ name: 'company_id' }),
    __metadata("design:type", company_entity_1.CompanyEntity)
], LeaveTypePolicyEntity.prototype, "company", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => leave_type_entity_1.LeaveTypeEntity),
    (0, typeorm_1.JoinColumn)({ name: 'lt_id' }),
    __metadata("design:type", leave_type_entity_1.LeaveTypeEntity)
], LeaveTypePolicyEntity.prototype, "leaveType", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => leave_type_policy_credit_entity_1.LeaveTypePolicyCreditEntity, record => record.leavePolicy),
    __metadata("design:type", Array)
], LeaveTypePolicyEntity.prototype, "leaveTypePolicyCredits", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => leave_type_policy_credit_entity_1.LeaveTypePolicyCreditEntity, record => record.employeePolicy),
    __metadata("design:type", leave_type_policy_credit_entity_1.LeaveTypePolicyCreditEntity)
], LeaveTypePolicyEntity.prototype, "employeePolicyCredit", void 0);
exports.LeaveTypePolicyEntity = LeaveTypePolicyEntity = __decorate([
    (0, typeorm_1.Entity)({ name: enums_2.ETableName.LEAVE_TYPE_POLICY })
], LeaveTypePolicyEntity);
//# sourceMappingURL=leave-type-policy.entity.js.map