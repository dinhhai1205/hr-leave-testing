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
exports.LeaveTypePolicyCreditTrxEntity = void 0;
const typeorm_1 = require("typeorm");
const enums_1 = require("../../../common/enums");
const constants_1 = require("../constants");
const enums_2 = require("../enums");
const utils_1 = require("../utils");
const abstract_entity_1 = require("./abstract.entity");
const leave_type_policy_credit_entity_1 = require("./leave-type-policy-credit.entity");
let LeaveTypePolicyCreditTrxEntity = class LeaveTypePolicyCreditTrxEntity extends abstract_entity_1.AbstractEntity {
};
exports.LeaveTypePolicyCreditTrxEntity = LeaveTypePolicyCreditTrxEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    __metadata("design:type", Number)
], LeaveTypePolicyCreditTrxEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], LeaveTypePolicyCreditTrxEntity.prototype, "companyId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], LeaveTypePolicyCreditTrxEntity.prototype, "employeeId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], LeaveTypePolicyCreditTrxEntity.prototype, "leaveId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], LeaveTypePolicyCreditTrxEntity.prototype, "leaveTypeId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], LeaveTypePolicyCreditTrxEntity.prototype, "leaveTypePolicyId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], LeaveTypePolicyCreditTrxEntity.prototype, "leaveTypePolicyCreditUUID", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: (0, utils_1.columnType)('DATETIME'), nullable: true }),
    __metadata("design:type", Date)
], LeaveTypePolicyCreditTrxEntity.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], LeaveTypePolicyCreditTrxEntity.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: (0, utils_1.columnType)('INTEGER') }),
    __metadata("design:type", Number)
], LeaveTypePolicyCreditTrxEntity.prototype, "sign", void 0);
__decorate([
    (0, typeorm_1.Column)(constants_1.NUMERIC_COLUMN_TYPE),
    __metadata("design:type", Number)
], LeaveTypePolicyCreditTrxEntity.prototype, "unit", void 0);
__decorate([
    (0, typeorm_1.Column)(constants_1.NUMERIC_COLUMN_TYPE),
    __metadata("design:type", Number)
], LeaveTypePolicyCreditTrxEntity.prototype, "creditRemaining", void 0);
__decorate([
    (0, typeorm_1.Column)(constants_1.NUMERIC_COLUMN_TYPE),
    __metadata("design:type", Number)
], LeaveTypePolicyCreditTrxEntity.prototype, "carryForwardRemaining", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], LeaveTypePolicyCreditTrxEntity.prototype, "reason", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], LeaveTypePolicyCreditTrxEntity.prototype, "currentPolicySetting", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], LeaveTypePolicyCreditTrxEntity.prototype, "previousPolicySetting", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], LeaveTypePolicyCreditTrxEntity.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], LeaveTypePolicyCreditTrxEntity.prototype, "updatedBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => leave_type_policy_credit_entity_1.LeaveTypePolicyCreditEntity, entity => entity.creditTrxs),
    (0, typeorm_1.JoinColumn)({ name: 'leave_type_policy_credit_uuid' }),
    __metadata("design:type", leave_type_policy_credit_entity_1.LeaveTypePolicyCreditEntity)
], LeaveTypePolicyCreditTrxEntity.prototype, "policyCredit", void 0);
exports.LeaveTypePolicyCreditTrxEntity = LeaveTypePolicyCreditTrxEntity = __decorate([
    (0, typeorm_1.Entity)({ name: enums_2.ETableName.LEAVE_TYPE_POLICY_CREDIT_TRX })
], LeaveTypePolicyCreditTrxEntity);
//# sourceMappingURL=leave-type-policy-credit-trx.entity.js.map