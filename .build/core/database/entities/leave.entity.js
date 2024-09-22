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
exports.LeaveEntity = void 0;
const typeorm_1 = require("typeorm");
const enums_1 = require("../../../common/enums");
const constants_1 = require("../constants");
const date_column_type_constant_1 = require("../constants/date-column-type.constant");
const abstract_entity_1 = require("./abstract.entity");
const company_entity_1 = require("./company.entity");
const employee_entity_1 = require("./employee.entity");
const leave_type_entity_1 = require("./leave-type.entity");
const trx_approval_user_entity_1 = require("./trx-approval-user.entity");
let LeaveEntity = class LeaveEntity extends abstract_entity_1.AbstractEntity {
};
exports.LeaveEntity = LeaveEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    __metadata("design:type", Number)
], LeaveEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], LeaveEntity.prototype, "leaveNo", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], LeaveEntity.prototype, "companyId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], LeaveEntity.prototype, "employeeId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], LeaveEntity.prototype, "leaveTypeId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], LeaveEntity.prototype, "updatedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], LeaveEntity.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 2000 }),
    __metadata("design:type", String)
], LeaveEntity.prototype, "reason", void 0);
__decorate([
    (0, typeorm_1.Column)({ enum: enums_1.ELeaveStatusId, default: enums_1.ELeaveStatusId.DRAFT, type: 'int' }),
    __metadata("design:type", Number)
], LeaveEntity.prototype, "statusId", void 0);
__decorate([
    (0, typeorm_1.Column)(date_column_type_constant_1.DATE_COLUMN_TYPE),
    __metadata("design:type", Date)
], LeaveEntity.prototype, "dateFrom", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: enums_1.ELeaveDuration.FULL_DAY, type: 'double precision' }),
    __metadata("design:type", Number)
], LeaveEntity.prototype, "fromFdHd", void 0);
__decorate([
    (0, typeorm_1.Column)(date_column_type_constant_1.DATE_COLUMN_TYPE),
    __metadata("design:type", Date)
], LeaveEntity.prototype, "dateTo", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: enums_1.ELeaveDuration.FULL_DAY, type: 'double precision' }),
    __metadata("design:type", Number)
], LeaveEntity.prototype, "toFdHd", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false, type: 'double precision' }),
    __metadata("design:type", Number)
], LeaveEntity.prototype, "effDayOfLeave", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], LeaveEntity.prototype, "allMustApprove", void 0);
__decorate([
    (0, typeorm_1.Column)(constants_1.DATETIME_WITHOUT_TZ_COLUMN_TYPE),
    __metadata("design:type", Date)
], LeaveEntity.prototype, "approvedOn", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], LeaveEntity.prototype, "approvedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], LeaveEntity.prototype, "cancelledOn", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], LeaveEntity.prototype, "cancelledBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], LeaveEntity.prototype, "declinedOn", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], LeaveEntity.prototype, "declinedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: 0 }),
    __metadata("design:type", Number)
], LeaveEntity.prototype, "fileCount", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], LeaveEntity.prototype, "parentLeaveTypeId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], LeaveEntity.prototype, "remark", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => company_entity_1.CompanyEntity),
    (0, typeorm_1.JoinColumn)({ name: 'company_id' }),
    __metadata("design:type", company_entity_1.CompanyEntity)
], LeaveEntity.prototype, "company", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => employee_entity_1.EmployeeEntity),
    (0, typeorm_1.JoinColumn)({ name: 'employee_id' }),
    __metadata("design:type", employee_entity_1.EmployeeEntity)
], LeaveEntity.prototype, "employee", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => leave_type_entity_1.LeaveTypeEntity),
    (0, typeorm_1.JoinColumn)({ name: 'leave_type_id' }),
    __metadata("design:type", leave_type_entity_1.LeaveTypeEntity)
], LeaveEntity.prototype, "leaveType", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => trx_approval_user_entity_1.TrxApprovalUserEntity, record => record.leave),
    __metadata("design:type", Array)
], LeaveEntity.prototype, "approverTrx", void 0);
exports.LeaveEntity = LeaveEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'leave' })
], LeaveEntity);
//# sourceMappingURL=leave.entity.js.map