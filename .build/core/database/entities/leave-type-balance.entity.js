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
exports.LeaveTypeBalanceEntity = void 0;
const typeorm_1 = require("typeorm");
const constants_1 = require("../constants");
const enums_1 = require("../enums");
const abstract_entity_1 = require("./abstract.entity");
const company_entity_1 = require("./company.entity");
const employee_entity_1 = require("./employee.entity");
const leave_trx_entity_1 = require("./leave-trx.entity");
const leave_type_entity_1 = require("./leave-type.entity");
let LeaveTypeBalanceEntity = class LeaveTypeBalanceEntity extends abstract_entity_1.AbstractEntity {
};
exports.LeaveTypeBalanceEntity = LeaveTypeBalanceEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    __metadata("design:type", Number)
], LeaveTypeBalanceEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], LeaveTypeBalanceEntity.prototype, "companyId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], LeaveTypeBalanceEntity.prototype, "employeeId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], LeaveTypeBalanceEntity.prototype, "leaveTypeId", void 0);
__decorate([
    (0, typeorm_1.Column)(constants_1.NUMERIC_COLUMN_TYPE),
    __metadata("design:type", Number)
], LeaveTypeBalanceEntity.prototype, "balance", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], LeaveTypeBalanceEntity.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], LeaveTypeBalanceEntity.prototype, "updatedBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => company_entity_1.CompanyEntity),
    (0, typeorm_1.JoinColumn)({ name: 'company_id' }),
    __metadata("design:type", company_entity_1.CompanyEntity)
], LeaveTypeBalanceEntity.prototype, "company", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => employee_entity_1.EmployeeEntity),
    (0, typeorm_1.JoinColumn)([{ name: 'employee_id' }]),
    __metadata("design:type", employee_entity_1.EmployeeEntity)
], LeaveTypeBalanceEntity.prototype, "employee", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => leave_type_entity_1.LeaveTypeEntity, record => record.leaveTypeBalances),
    (0, typeorm_1.JoinColumn)({ name: 'leave_type_id' }),
    __metadata("design:type", leave_type_entity_1.LeaveTypeEntity)
], LeaveTypeBalanceEntity.prototype, "leaveType", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => leave_type_entity_1.LeaveTypeEntity, record => record.employeeLeaveTypeBalance),
    (0, typeorm_1.JoinColumn)([{ name: 'leave_type_id' }]),
    __metadata("design:type", leave_type_entity_1.LeaveTypeEntity)
], LeaveTypeBalanceEntity.prototype, "employeeLeaveType", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => leave_trx_entity_1.LeaveTrxEntity, record => record.leaveTypeBalance),
    (0, typeorm_1.JoinColumn)([{ name: 'employee_id' }, { name: 'leave_type_id' }]),
    __metadata("design:type", Array)
], LeaveTypeBalanceEntity.prototype, "leaveTransactions", void 0);
exports.LeaveTypeBalanceEntity = LeaveTypeBalanceEntity = __decorate([
    (0, typeorm_1.Entity)({ name: enums_1.ETableName.LEAVE_TYPE_BALANCE })
], LeaveTypeBalanceEntity);
//# sourceMappingURL=leave-type-balance.entity.js.map