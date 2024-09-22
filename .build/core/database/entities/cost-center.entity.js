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
exports.CostCenterEntity = void 0;
const typeorm_1 = require("typeorm");
const base_app_entity_1 = require("./base-app.entity");
const enums_1 = require("../enums");
const employee_entity_1 = require("./employee.entity");
let CostCenterEntity = class CostCenterEntity extends base_app_entity_1.BaseAppEntity {
};
exports.CostCenterEntity = CostCenterEntity;
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 50,
        nullable: false,
    }),
    __metadata("design:type", String)
], CostCenterEntity.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'bigint',
        nullable: false,
    }),
    __metadata("design:type", Number)
], CostCenterEntity.prototype, "companyId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 100,
        nullable: false,
    }),
    __metadata("design:type", String)
], CostCenterEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => employee_entity_1.EmployeeEntity, record => record.costCenter),
    (0, typeorm_1.JoinColumn)({ name: 'id' }),
    __metadata("design:type", Array)
], CostCenterEntity.prototype, "employees", void 0);
exports.CostCenterEntity = CostCenterEntity = __decorate([
    (0, typeorm_1.Entity)({
        name: enums_1.ETableName.COST_CENTER,
    })
], CostCenterEntity);
//# sourceMappingURL=cost-center.entity.js.map