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
exports.PayrollTimeSheetEntity = void 0;
const typeorm_1 = require("typeorm");
const enums_1 = require("../enums");
const base_app_entity_1 = require("./base-app.entity");
const employee_entity_1 = require("./employee.entity");
const timesheet_adjustment_entity_1 = require("./timesheet-adjustment.entity");
const prtrx_hdr_entity_1 = require("./prtrx-hdr.entity");
const constants_1 = require("../constants");
let PayrollTimeSheetEntity = class PayrollTimeSheetEntity extends base_app_entity_1.BaseAppEntity {
};
exports.PayrollTimeSheetEntity = PayrollTimeSheetEntity;
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], PayrollTimeSheetEntity.prototype, "companyId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], PayrollTimeSheetEntity.prototype, "employeeId", void 0);
__decorate([
    (0, typeorm_1.Column)(constants_1.NUMERIC_COLUMN_TYPE),
    __metadata("design:type", Number)
], PayrollTimeSheetEntity.prototype, "totalScheduledWorkDays", void 0);
__decorate([
    (0, typeorm_1.Column)(constants_1.NUMERIC_COLUMN_TYPE),
    __metadata("design:type", Number)
], PayrollTimeSheetEntity.prototype, "totalScheduledWorkHours", void 0);
__decorate([
    (0, typeorm_1.Column)(constants_1.NUMERIC_COLUMN_TYPE),
    __metadata("design:type", Number)
], PayrollTimeSheetEntity.prototype, "totalPayrollRegularWorkDays", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], PayrollTimeSheetEntity.prototype, "prtrxHdrId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => employee_entity_1.EmployeeEntity, employee => employee.payrollTimeSheets),
    (0, typeorm_1.JoinColumn)({ name: 'employee_id' }),
    __metadata("design:type", employee_entity_1.EmployeeEntity)
], PayrollTimeSheetEntity.prototype, "employee", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => timesheet_adjustment_entity_1.TimeSheetAdjustmentEntity, record => record.payroll),
    __metadata("design:type", Array)
], PayrollTimeSheetEntity.prototype, "timeSheetAdjustments", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => prtrx_hdr_entity_1.PrtrxHdrEntity, record => record.payrollTimeSheets),
    (0, typeorm_1.JoinColumn)({ name: 'prtrx_hdr_id' }),
    __metadata("design:type", prtrx_hdr_entity_1.PrtrxHdrEntity)
], PayrollTimeSheetEntity.prototype, "prtrxHdr", void 0);
exports.PayrollTimeSheetEntity = PayrollTimeSheetEntity = __decorate([
    (0, typeorm_1.Entity)(enums_1.ETableName.PAYROLL_TIME_SHEET)
], PayrollTimeSheetEntity);
//# sourceMappingURL=payroll-timesheet.entity.js.map