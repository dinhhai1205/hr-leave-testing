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
exports.OrganizationStructureEntity = void 0;
const typeorm_1 = require("typeorm");
const enums_1 = require("../enums");
const abstract_entity_1 = require("./abstract.entity");
const employee_entity_1 = require("./employee.entity");
const work_schedule_entity_1 = require("./work-schedule.entity");
let OrganizationStructureEntity = class OrganizationStructureEntity extends abstract_entity_1.AbstractEntity {
};
exports.OrganizationStructureEntity = OrganizationStructureEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    __metadata("design:type", Number)
], OrganizationStructureEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], OrganizationStructureEntity.prototype, "companyId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], OrganizationStructureEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], OrganizationStructureEntity.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], OrganizationStructureEntity.prototype, "parentId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], OrganizationStructureEntity.prototype, "headCount", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], OrganizationStructureEntity.prototype, "head", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], OrganizationStructureEntity.prototype, "orgPath", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], OrganizationStructureEntity.prototype, "workScheduleId", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => employee_entity_1.EmployeeEntity, employee => employee.orgStructure),
    __metadata("design:type", Array)
], OrganizationStructureEntity.prototype, "employees", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => work_schedule_entity_1.WorkScheduleEntity, workSchedule => workSchedule.organizationStructures),
    (0, typeorm_1.JoinColumn)({ name: 'work_schedule_id' }),
    __metadata("design:type", work_schedule_entity_1.WorkScheduleEntity)
], OrganizationStructureEntity.prototype, "workSchedule", void 0);
exports.OrganizationStructureEntity = OrganizationStructureEntity = __decorate([
    (0, typeorm_1.Entity)({ name: enums_1.ETableName.ORGANIZATION_STRUCTURE })
], OrganizationStructureEntity);
//# sourceMappingURL=organization-structure.entity.js.map