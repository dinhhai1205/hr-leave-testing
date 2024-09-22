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
exports.CompanyEntity = void 0;
const typeorm_1 = require("typeorm");
const enums_1 = require("../enums");
const abstract_entity_1 = require("./abstract.entity");
const company_parameter_entity_1 = require("./company-parameter.entity");
const prtrx_hdr_entity_1 = require("./prtrx-hdr.entity");
let CompanyEntity = class CompanyEntity extends abstract_entity_1.AbstractEntity {
};
exports.CompanyEntity = CompanyEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    __metadata("design:type", Number)
], CompanyEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CompanyEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CompanyEntity.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], CompanyEntity.prototype, "active", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => company_parameter_entity_1.CompanyParameterEntity, e => e.company),
    __metadata("design:type", company_parameter_entity_1.CompanyParameterEntity)
], CompanyEntity.prototype, "companyParameter", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => prtrx_hdr_entity_1.PrtrxHdrEntity, e => e.company),
    (0, typeorm_1.JoinColumn)({ name: 'id' }),
    __metadata("design:type", Array)
], CompanyEntity.prototype, "prtrxHdrs", void 0);
exports.CompanyEntity = CompanyEntity = __decorate([
    (0, typeorm_1.Entity)({ name: enums_1.ETableName.COMPANY })
], CompanyEntity);
//# sourceMappingURL=company.entity.js.map