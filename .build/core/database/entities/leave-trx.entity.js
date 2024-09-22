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
exports.LeaveTrxEntity = void 0;
const typeorm_1 = require("typeorm");
const enums_1 = require("../../../common/enums");
const constants_1 = require("../constants");
const enums_2 = require("../enums");
const utils_1 = require("../utils");
const abstract_entity_1 = require("./abstract.entity");
const company_entity_1 = require("./company.entity");
const employee_entity_1 = require("./employee.entity");
const leave_type_balance_entity_1 = require("./leave-type-balance.entity");
const leave_type_policy_entity_1 = require("./leave-type-policy.entity");
const leave_type_entity_1 = require("./leave-type.entity");
let LeaveTrxEntity = class LeaveTrxEntity extends abstract_entity_1.AbstractEntity {
};
exports.LeaveTrxEntity = LeaveTrxEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    __metadata("design:type", Number)
], LeaveTrxEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], LeaveTrxEntity.prototype, "companyId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], LeaveTrxEntity.prototype, "leaveTypeId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], LeaveTrxEntity.prototype, "policyId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], LeaveTrxEntity.prototype, "employeeId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], LeaveTrxEntity.prototype, "employeeRef", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], LeaveTrxEntity.prototype, "joinDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], LeaveTrxEntity.prototype, "effDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], LeaveTrxEntity.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], LeaveTrxEntity.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: (0, utils_1.columnType)('INTEGER') }),
    __metadata("design:type", Number)
], LeaveTrxEntity.prototype, "sign", void 0);
__decorate([
    (0, typeorm_1.Column)(constants_1.NUMERIC_COLUMN_TYPE),
    __metadata("design:type", Number)
], LeaveTrxEntity.prototype, "unit", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'numeric', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], LeaveTrxEntity.prototype, "balance", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], LeaveTrxEntity.prototype, "currentPolicySetting", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], LeaveTrxEntity.prototype, "previousPolicySetting", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], LeaveTrxEntity.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], LeaveTrxEntity.prototype, "updatedBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => company_entity_1.CompanyEntity),
    (0, typeorm_1.JoinColumn)({ name: 'company_id' }),
    __metadata("design:type", company_entity_1.CompanyEntity)
], LeaveTrxEntity.prototype, "company", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => leave_type_entity_1.LeaveTypeEntity, entity => entity.leaveTransactions),
    (0, typeorm_1.JoinColumn)({ name: 'leave_type_id' }),
    __metadata("design:type", leave_type_entity_1.LeaveTypeEntity)
], LeaveTrxEntity.prototype, "leaveType", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => leave_type_policy_entity_1.LeaveTypePolicyEntity),
    (0, typeorm_1.JoinColumn)({ name: 'policy_id' }),
    __metadata("design:type", leave_type_policy_entity_1.LeaveTypePolicyEntity)
], LeaveTrxEntity.prototype, "leaveTypePolicy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => employee_entity_1.EmployeeEntity),
    (0, typeorm_1.JoinColumn)([{ name: 'employee_id' }]),
    __metadata("design:type", employee_entity_1.EmployeeEntity)
], LeaveTrxEntity.prototype, "employee", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => leave_type_balance_entity_1.LeaveTypeBalanceEntity),
    (0, typeorm_1.JoinColumn)([{ name: 'employee_id' }, { name: 'leave_type_id' }]),
    __metadata("design:type", leave_type_balance_entity_1.LeaveTypeBalanceEntity)
], LeaveTrxEntity.prototype, "leaveTypeBalance", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => leave_type_policy_entity_1.LeaveTypePolicyEntity),
    (0, typeorm_1.JoinColumn)({ name: 'policy_id' }),
    __metadata("design:type", leave_type_policy_entity_1.LeaveTypePolicyEntity)
], LeaveTrxEntity.prototype, "policy", void 0);
exports.LeaveTrxEntity = LeaveTrxEntity = __decorate([
    (0, typeorm_1.Entity)({ name: enums_2.ETableName.LEAVE_TRANSACTION })
], LeaveTrxEntity);
//# sourceMappingURL=leave-trx.entity.js.map