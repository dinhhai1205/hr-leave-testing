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
exports.LeaveTypeEntity = void 0;
const typeorm_1 = require("typeorm");
const leave_type_rounding_options_enum_1 = require("../../../modules/time-off/modules/leave-type/enums/leave-type-rounding-options.enum");
const constants_1 = require("../constants");
const enums_1 = require("../enums");
const abstract_entity_1 = require("./abstract.entity");
const company_entity_1 = require("./company.entity");
const leave_trx_entity_1 = require("./leave-trx.entity");
const leave_type_assigment_entity_1 = require("./leave-type-assigment.entity");
const leave_type_balance_entity_1 = require("./leave-type-balance.entity");
const leave_type_policy_entity_1 = require("./leave-type-policy.entity");
const leave_entity_1 = require("./leave.entity");
let LeaveTypeEntity = class LeaveTypeEntity extends abstract_entity_1.AbstractEntity {
};
exports.LeaveTypeEntity = LeaveTypeEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    __metadata("design:type", Number)
], LeaveTypeEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], LeaveTypeEntity.prototype, "companyId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], LeaveTypeEntity.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], LeaveTypeEntity.prototype, "updatedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, length: 200 }),
    __metadata("design:type", String)
], LeaveTypeEntity.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, length: 1000 }),
    __metadata("design:type", String)
], LeaveTypeEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, length: 2000 }),
    __metadata("design:type", String)
], LeaveTypeEntity.prototype, "remark", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], LeaveTypeEntity.prototype, "paidLeave", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], LeaveTypeEntity.prototype, "color", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], LeaveTypeEntity.prototype, "startDate", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], LeaveTypeEntity.prototype, "endDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], LeaveTypeEntity.prototype, "allowApplyExceed", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], LeaveTypeEntity.prototype, "allowFutureDates", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], LeaveTypeEntity.prototype, "daysFromNow", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], LeaveTypeEntity.prototype, "allowPastDates", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], LeaveTypeEntity.prototype, "daysAgo", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], LeaveTypeEntity.prototype, "daysInAdvance", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], LeaveTypeEntity.prototype, "maxDayApply", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], LeaveTypeEntity.prototype, "maxConsecutive", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], LeaveTypeEntity.prototype, "allowApplyHalfDay", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], LeaveTypeEntity.prototype, "includePublicHoliday", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], LeaveTypeEntity.prototype, "includeNonWorkingDay", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], LeaveTypeEntity.prototype, "isSpecial", void 0);
__decorate([
    (0, typeorm_1.Column)(constants_1.NUMERIC_COLUMN_TYPE),
    __metadata("design:type", Number)
], LeaveTypeEntity.prototype, "cfRoundTo", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], LeaveTypeEntity.prototype, "active", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], LeaveTypeEntity.prototype, "activeForEss", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, ...constants_1.BIGINT_COLUMN_TYPE }),
    __metadata("design:type", Object)
], LeaveTypeEntity.prototype, "parentId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => company_entity_1.CompanyEntity),
    (0, typeorm_1.JoinColumn)({ name: 'company_id' }),
    __metadata("design:type", company_entity_1.CompanyEntity)
], LeaveTypeEntity.prototype, "company", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => leave_entity_1.LeaveEntity, record => record.leaveType),
    __metadata("design:type", Array)
], LeaveTypeEntity.prototype, "leaves", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => leave_type_policy_entity_1.LeaveTypePolicyEntity, record => record.leaveType),
    __metadata("design:type", Array)
], LeaveTypeEntity.prototype, "leaveTypePolicies", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => leave_type_balance_entity_1.LeaveTypeBalanceEntity, record => record.leaveType),
    __metadata("design:type", Array)
], LeaveTypeEntity.prototype, "leaveTypeBalances", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => leave_type_balance_entity_1.LeaveTypeBalanceEntity, record => record.employeeLeaveType),
    __metadata("design:type", leave_type_balance_entity_1.LeaveTypeBalanceEntity)
], LeaveTypeEntity.prototype, "employeeLeaveTypeBalance", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => leave_type_assigment_entity_1.LeaveTypeAssignmentEntity, record => record.leaveType),
    __metadata("design:type", leave_type_assigment_entity_1.LeaveTypeAssignmentEntity)
], LeaveTypeEntity.prototype, "leaveTypeAssignment", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => leave_trx_entity_1.LeaveTrxEntity, record => record.leaveType),
    __metadata("design:type", Array)
], LeaveTypeEntity.prototype, "leaveTransactions", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => LeaveTypeEntity, category => category.children),
    (0, typeorm_1.JoinColumn)({ name: 'parent_id' }),
    __metadata("design:type", Object)
], LeaveTypeEntity.prototype, "parent", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => LeaveTypeEntity, category => category.parent),
    __metadata("design:type", Array)
], LeaveTypeEntity.prototype, "children", void 0);
exports.LeaveTypeEntity = LeaveTypeEntity = __decorate([
    (0, typeorm_1.Entity)({ name: enums_1.ETableName.LEAVE_TYPE })
], LeaveTypeEntity);
//# sourceMappingURL=leave-type.entity.js.map