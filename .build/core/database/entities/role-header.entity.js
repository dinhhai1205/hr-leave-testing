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
exports.RoleHeaderEntity = void 0;
const typeorm_1 = require("typeorm");
const table_name_enum_1 = require("../enums/table-name.enum");
const abstract_entity_1 = require("./abstract.entity");
const company_user_role_entity_1 = require("./company-user-role.entity");
const role_detail_entity_1 = require("./role-detail.entity");
let RoleHeaderEntity = class RoleHeaderEntity extends abstract_entity_1.AbstractEntity {
};
exports.RoleHeaderEntity = RoleHeaderEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    __metadata("design:type", Number)
], RoleHeaderEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], RoleHeaderEntity.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], RoleHeaderEntity.prototype, "companyId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], RoleHeaderEntity.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], RoleHeaderEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], RoleHeaderEntity.prototype, "updatedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], RoleHeaderEntity.prototype, "deletable", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], RoleHeaderEntity.prototype, "leave", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], RoleHeaderEntity.prototype, "approval", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], RoleHeaderEntity.prototype, "payroll", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], RoleHeaderEntity.prototype, "esign", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], RoleHeaderEntity.prototype, "statRpt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => company_user_role_entity_1.CompanyUserRoleEntity, record => record.roleHeader),
    __metadata("design:type", Array)
], RoleHeaderEntity.prototype, "companyUserRoles", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => role_detail_entity_1.RoleDetailEntity, record => record.roleHeader),
    __metadata("design:type", Array)
], RoleHeaderEntity.prototype, "roleDetails", void 0);
exports.RoleHeaderEntity = RoleHeaderEntity = __decorate([
    (0, typeorm_1.Entity)({ name: table_name_enum_1.ETableName.ROLE_HEADER })
], RoleHeaderEntity);
//# sourceMappingURL=role-header.entity.js.map