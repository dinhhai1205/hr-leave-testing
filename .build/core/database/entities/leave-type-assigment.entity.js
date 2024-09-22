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
exports.LeaveTypeAssignmentEntity = void 0;
const typeorm_1 = require("typeorm");
const enums_1 = require("../enums");
const abstract_entity_1 = require("./abstract.entity");
const company_entity_1 = require("./company.entity");
const leave_type_entity_1 = require("./leave-type.entity");
let LeaveTypeAssignmentEntity = class LeaveTypeAssignmentEntity extends abstract_entity_1.AbstractEntity {
};
exports.LeaveTypeAssignmentEntity = LeaveTypeAssignmentEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    __metadata("design:type", Number)
], LeaveTypeAssignmentEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], LeaveTypeAssignmentEntity.prototype, "companyId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], LeaveTypeAssignmentEntity.prototype, "ltId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], LeaveTypeAssignmentEntity.prototype, "genderIds", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], LeaveTypeAssignmentEntity.prototype, "mariStsIds", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], LeaveTypeAssignmentEntity.prototype, "jobGradeIds", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], LeaveTypeAssignmentEntity.prototype, "orgEleIds", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], LeaveTypeAssignmentEntity.prototype, "contractTypeIds", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], LeaveTypeAssignmentEntity.prototype, "employeeIds", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], LeaveTypeAssignmentEntity.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], LeaveTypeAssignmentEntity.prototype, "updatedBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => company_entity_1.CompanyEntity),
    (0, typeorm_1.JoinColumn)({ name: 'company_id' }),
    __metadata("design:type", company_entity_1.CompanyEntity)
], LeaveTypeAssignmentEntity.prototype, "company", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => leave_type_entity_1.LeaveTypeEntity, record => record.leaveTypeAssignment),
    (0, typeorm_1.JoinColumn)({ name: 'lt_id' }),
    __metadata("design:type", leave_type_entity_1.LeaveTypeEntity)
], LeaveTypeAssignmentEntity.prototype, "leaveType", void 0);
exports.LeaveTypeAssignmentEntity = LeaveTypeAssignmentEntity = __decorate([
    (0, typeorm_1.Entity)({ name: enums_1.ETableName.LEAVE_TYPE_ASSIGNMENT })
], LeaveTypeAssignmentEntity);
//# sourceMappingURL=leave-type-assigment.entity.js.map