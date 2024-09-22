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
exports.CompanyUserRoleEntity = void 0;
const typeorm_1 = require("typeorm");
const table_name_enum_1 = require("../enums/table-name.enum");
const abstract_entity_1 = require("./abstract.entity");
const role_header_entity_1 = require("./role-header.entity");
let CompanyUserRoleEntity = class CompanyUserRoleEntity extends abstract_entity_1.AbstractEntity {
};
exports.CompanyUserRoleEntity = CompanyUserRoleEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    __metadata("design:type", Number)
], CompanyUserRoleEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], CompanyUserRoleEntity.prototype, "companyId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], CompanyUserRoleEntity.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], CompanyUserRoleEntity.prototype, "roleHeaderId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], CompanyUserRoleEntity.prototype, "updatedBy", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CompanyUserRoleEntity.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], CompanyUserRoleEntity.prototype, "active", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], CompanyUserRoleEntity.prototype, "isApprover", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '1800-01-01' }),
    __metadata("design:type", String)
], CompanyUserRoleEntity.prototype, "effDateFrom", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '2999-12-31' }),
    __metadata("design:type", String)
], CompanyUserRoleEntity.prototype, "effDateTo", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CompanyUserRoleEntity.prototype, "orgElementListJson", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => role_header_entity_1.RoleHeaderEntity),
    (0, typeorm_1.JoinColumn)({ name: 'role_header_id' }),
    __metadata("design:type", role_header_entity_1.RoleHeaderEntity)
], CompanyUserRoleEntity.prototype, "roleHeader", void 0);
exports.CompanyUserRoleEntity = CompanyUserRoleEntity = __decorate([
    (0, typeorm_1.Entity)({ name: table_name_enum_1.ETableName.COMPANY_USER_ROLE })
], CompanyUserRoleEntity);
//# sourceMappingURL=company-user-role.entity.js.map