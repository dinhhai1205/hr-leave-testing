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
exports.EmployeeContractEntity = void 0;
const typeorm_1 = require("typeorm");
const enums_1 = require("../../../common/enums");
const enums_2 = require("../enums");
const abstract_entity_1 = require("./abstract.entity");
let EmployeeContractEntity = class EmployeeContractEntity extends abstract_entity_1.AbstractEntity {
};
exports.EmployeeContractEntity = EmployeeContractEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    __metadata("design:type", Number)
], EmployeeContractEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], EmployeeContractEntity.prototype, "companyId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], EmployeeContractEntity.prototype, "dateFrom", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], EmployeeContractEntity.prototype, "dateTo", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], EmployeeContractEntity.prototype, "employeeId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], EmployeeContractEntity.prototype, "contractType", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], EmployeeContractEntity.prototype, "active", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], EmployeeContractEntity.prototype, "referenceNo", void 0);
exports.EmployeeContractEntity = EmployeeContractEntity = __decorate([
    (0, typeorm_1.Entity)({ name: enums_2.ETableName.EMPLOYEE_CONTRACT })
], EmployeeContractEntity);
//# sourceMappingURL=employee-contract.entity.js.map