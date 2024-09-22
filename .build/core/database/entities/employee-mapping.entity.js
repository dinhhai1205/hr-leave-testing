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
exports.EmployeeMappingEntity = void 0;
const typeorm_1 = require("typeorm");
const enums_1 = require("../enums");
const base_app_entity_1 = require("./base-app.entity");
const company_entity_1 = require("./company.entity");
let EmployeeMappingEntity = class EmployeeMappingEntity extends base_app_entity_1.BaseAppEntity {
};
exports.EmployeeMappingEntity = EmployeeMappingEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    __metadata("design:type", Number)
], EmployeeMappingEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], EmployeeMappingEntity.prototype, "userEmail", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], EmployeeMappingEntity.prototype, "employeeId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], EmployeeMappingEntity.prototype, "timeTrackerEmployeeId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], EmployeeMappingEntity.prototype, "companyId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => company_entity_1.CompanyEntity),
    (0, typeorm_1.JoinColumn)({ name: 'company_id' }),
    __metadata("design:type", company_entity_1.CompanyEntity)
], EmployeeMappingEntity.prototype, "company", void 0);
exports.EmployeeMappingEntity = EmployeeMappingEntity = __decorate([
    (0, typeorm_1.Entity)({ name: enums_1.ETableName.EMPLOYEE_MAPPING })
], EmployeeMappingEntity);
//# sourceMappingURL=employee-mapping.entity.js.map