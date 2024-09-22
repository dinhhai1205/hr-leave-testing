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
exports.EmployeeEntity = void 0;
const typeorm_1 = require("typeorm");
const _1 = require(".");
const contract_type_enum_1 = require("../../../common/enums/contract-type.enum");
const payroll_group_type_enum_1 = require("../../../modules/payroll/modules/payroll-group/enums/payroll-group-type.enum");
const date_column_type_constant_1 = require("../constants/date-column-type.constant");
const enums_1 = require("../enums");
const abstract_entity_1 = require("./abstract.entity");
const cost_center_entity_1 = require("./cost-center.entity");
const payroll_timesheet_entity_1 = require("./payroll-timesheet.entity");
const prtrx_emp_entity_1 = require("./prtrx-emp.entity");
const work_schedule_assignment_entity_1 = require("./work-schedule-assignment.entity");
const work_schedule_entity_1 = require("./work-schedule.entity");
let EmployeeEntity = class EmployeeEntity extends abstract_entity_1.AbstractEntity {
    constructor() {
        super(...arguments);
        this.possiblePolicy = {};
    }
};
exports.EmployeeEntity = EmployeeEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    __metadata("design:type", Number)
], EmployeeEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], EmployeeEntity.prototype, "companyId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], EmployeeEntity.prototype, "payrollGroupId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], EmployeeEntity.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], EmployeeEntity.prototype, "employeeRef", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], EmployeeEntity.prototype, "employeeNo", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], EmployeeEntity.prototype, "fullNameLocal", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], EmployeeEntity.prototype, "fullNameEn", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], EmployeeEntity.prototype, "organizationElementId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], EmployeeEntity.prototype, "jobGradeId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], EmployeeEntity.prototype, "gender", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], EmployeeEntity.prototype, "contractType", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], EmployeeEntity.prototype, "contractDateFrom", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], EmployeeEntity.prototype, "contractDateTo", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], EmployeeEntity.prototype, "maritalStatusId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], EmployeeEntity.prototype, "active", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, ...date_column_type_constant_1.DATE_COLUMN_TYPE }),
    __metadata("design:type", Date)
], EmployeeEntity.prototype, "joinDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, ...date_column_type_constant_1.DATE_COLUMN_TYPE }),
    __metadata("design:type", Date)
], EmployeeEntity.prototype, "confirmDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, ...date_column_type_constant_1.DATE_COLUMN_TYPE }),
    __metadata("design:type", Date)
], EmployeeEntity.prototype, "seniorityDate", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], EmployeeEntity.prototype, "isEssEnabled", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], EmployeeEntity.prototype, "orgPath", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], EmployeeEntity.prototype, "lastWorkingDate", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], EmployeeEntity.prototype, "workScheduleId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], EmployeeEntity.prototype, "payrollFrequencyId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], EmployeeEntity.prototype, "costCenterId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'integer' }),
    __metadata("design:type", Number)
], EmployeeEntity.prototype, "payCalcMet", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], EmployeeEntity.prototype, "contractReferenceNo", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => _1.LeaveEntity, record => record.employee),
    __metadata("design:type", Array)
], EmployeeEntity.prototype, "leaves", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => _1.LeaveTypeBalanceEntity, record => record.employee),
    __metadata("design:type", Object)
], EmployeeEntity.prototype, "leaveTypeBalances", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => _1.LeaveTypePolicyCreditEntity, record => record.employee),
    __metadata("design:type", Object)
], EmployeeEntity.prototype, "leaveTypePolicyCredits", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => _1.ApprovalUserEntity, record => record.employee),
    (0, typeorm_1.JoinColumn)({ name: 'organization_element_id' }),
    __metadata("design:type", _1.ApprovalUserEntity)
], EmployeeEntity.prototype, "approvalUsers", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => _1.PayrollGroupEntity),
    (0, typeorm_1.JoinColumn)({ name: 'payroll_group_id' }),
    __metadata("design:type", _1.PayrollGroupEntity)
], EmployeeEntity.prototype, "payrollGroups", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => _1.CompanyEntity),
    (0, typeorm_1.JoinColumn)({ name: 'company_id' }),
    __metadata("design:type", _1.CompanyEntity)
], EmployeeEntity.prototype, "company", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => cost_center_entity_1.CostCenterEntity, record => record.employees),
    (0, typeorm_1.JoinColumn)({ name: 'cost_center_id' }),
    __metadata("design:type", cost_center_entity_1.CostCenterEntity)
], EmployeeEntity.prototype, "costCenter", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => _1.AspNetUsersEntity, record => record.employee),
    (0, typeorm_1.JoinColumn)({ name: 'email' }),
    __metadata("design:type", _1.AspNetUsersEntity)
], EmployeeEntity.prototype, "aspNetUsers", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => _1.LeaveTypeEntity, record => record.companyId),
    __metadata("design:type", Array)
], EmployeeEntity.prototype, "leaveTypes", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => work_schedule_entity_1.WorkScheduleEntity, workSchedule => workSchedule.employees),
    (0, typeorm_1.JoinColumn)({ name: 'work_schedule_id' }),
    __metadata("design:type", work_schedule_entity_1.WorkScheduleEntity)
], EmployeeEntity.prototype, "workSchedule", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => _1.OrganizationStructureEntity),
    (0, typeorm_1.JoinColumn)({ name: 'organization_element_id' }),
    __metadata("design:type", _1.OrganizationStructureEntity)
], EmployeeEntity.prototype, "orgStructure", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => payroll_timesheet_entity_1.PayrollTimeSheetEntity, record => record.employee),
    __metadata("design:type", Array)
], EmployeeEntity.prototype, "payrollTimeSheets", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => prtrx_emp_entity_1.PrtrxEmpEntity, record => record.employee),
    __metadata("design:type", Array)
], EmployeeEntity.prototype, "prtrxEmps", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => work_schedule_assignment_entity_1.WorkScheduleAssignmentEntity, e => e.employee),
    __metadata("design:type", Array)
], EmployeeEntity.prototype, "workScheduleAssignments", void 0);
exports.EmployeeEntity = EmployeeEntity = __decorate([
    (0, typeorm_1.Entity)({ name: enums_1.ETableName.EMPLOYEE })
], EmployeeEntity);
//# sourceMappingURL=employee.entity.js.map