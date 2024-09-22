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
exports.PrtrxHdrEntity = void 0;
const typeorm_1 = require("typeorm");
const enums_1 = require("../../../common/enums");
const enums_2 = require("../enums");
const abstract_entity_1 = require("./abstract.entity");
const company_entity_1 = require("./company.entity");
const cycle_period_detail_entity_1 = require("./cycle-period-detail.entity");
const payroll_timesheet_entity_1 = require("./payroll-timesheet.entity");
const prtrx_emp_entity_1 = require("./prtrx-emp.entity");
const cycle_frequency_entity_1 = require("./cycle-frequency.entity");
let PrtrxHdrEntity = class PrtrxHdrEntity extends abstract_entity_1.AbstractEntity {
};
exports.PrtrxHdrEntity = PrtrxHdrEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    __metadata("design:type", Number)
], PrtrxHdrEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], PrtrxHdrEntity.prototype, "companyId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], PrtrxHdrEntity.prototype, "statusId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], PrtrxHdrEntity.prototype, "specialRun", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], PrtrxHdrEntity.prototype, "payrollFrequencyId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], PrtrxHdrEntity.prototype, "payrollPeriodId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], PrtrxHdrEntity.prototype, "cntInMonth", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'date_from' }),
    __metadata("design:type", Date)
], PrtrxHdrEntity.prototype, "dateFrom", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'date_to' }),
    __metadata("design:type", Date)
], PrtrxHdrEntity.prototype, "dateTo", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], PrtrxHdrEntity.prototype, "isDeleted", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], PrtrxHdrEntity.prototype, "syncTimeTracker", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => cycle_period_detail_entity_1.CyclePeriodDetailEntity, record => record.prtrxHdrs),
    (0, typeorm_1.JoinColumn)({ name: 'payroll_period_id' }),
    __metadata("design:type", cycle_period_detail_entity_1.CyclePeriodDetailEntity)
], PrtrxHdrEntity.prototype, "cyclePeriodDetail", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => company_entity_1.CompanyEntity, record => record.prtrxHdrs),
    (0, typeorm_1.JoinColumn)({ name: 'company_id' }),
    __metadata("design:type", company_entity_1.CompanyEntity)
], PrtrxHdrEntity.prototype, "company", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => prtrx_emp_entity_1.PrtrxEmpEntity, record => record.hdr),
    __metadata("design:type", Array)
], PrtrxHdrEntity.prototype, "prtrxEmps", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => payroll_timesheet_entity_1.PayrollTimeSheetEntity, record => record.prtrxHdr),
    __metadata("design:type", Array)
], PrtrxHdrEntity.prototype, "payrollTimeSheets", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => cycle_period_detail_entity_1.CyclePeriodDetailEntity, record => record.prtrxHdrs),
    (0, typeorm_1.JoinColumn)({ name: 'payroll_period_id' }),
    __metadata("design:type", cycle_period_detail_entity_1.CyclePeriodDetailEntity)
], PrtrxHdrEntity.prototype, "period", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => cycle_frequency_entity_1.CycleFrequencyEntity, record => record.prtrxHdrs),
    (0, typeorm_1.JoinColumn)({ name: 'payroll_frequency_id' }),
    __metadata("design:type", cycle_frequency_entity_1.CycleFrequencyEntity)
], PrtrxHdrEntity.prototype, "frequency", void 0);
exports.PrtrxHdrEntity = PrtrxHdrEntity = __decorate([
    (0, typeorm_1.Entity)({ name: enums_2.ETableName.PRTRX_HDR })
], PrtrxHdrEntity);
//# sourceMappingURL=prtrx-hdr.entity.js.map