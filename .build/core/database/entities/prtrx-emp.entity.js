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
exports.PrtrxEmpEntity = void 0;
const typeorm_1 = require("typeorm");
const enums_1 = require("../enums");
const base_app_entity_1 = require("./base-app.entity");
const prtrx_hdr_entity_1 = require("./prtrx-hdr.entity");
const employee_entity_1 = require("./employee.entity");
let PrtrxEmpEntity = class PrtrxEmpEntity extends base_app_entity_1.BaseAppEntity {
};
exports.PrtrxEmpEntity = PrtrxEmpEntity;
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], PrtrxEmpEntity.prototype, "companyId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], PrtrxEmpEntity.prototype, "payrollTrxHeaderId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], PrtrxEmpEntity.prototype, "employeeId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], PrtrxEmpEntity.prototype, "included", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => prtrx_hdr_entity_1.PrtrxHdrEntity, record => record.prtrxEmps),
    (0, typeorm_1.JoinColumn)({ name: 'payroll_trx_header_id' }),
    __metadata("design:type", prtrx_hdr_entity_1.PrtrxHdrEntity)
], PrtrxEmpEntity.prototype, "hdr", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => employee_entity_1.EmployeeEntity, record => record.prtrxEmps),
    (0, typeorm_1.JoinColumn)({ name: 'employee_id' }),
    __metadata("design:type", employee_entity_1.EmployeeEntity)
], PrtrxEmpEntity.prototype, "employee", void 0);
exports.PrtrxEmpEntity = PrtrxEmpEntity = __decorate([
    (0, typeorm_1.Entity)({ name: enums_1.ETableName.PRTRX_EMP })
], PrtrxEmpEntity);
//# sourceMappingURL=prtrx-emp.entity.js.map