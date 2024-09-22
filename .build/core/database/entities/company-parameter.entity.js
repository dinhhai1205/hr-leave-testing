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
exports.CompanyParameterEntity = void 0;
const typeorm_1 = require("typeorm");
const enums_1 = require("../enums");
const abstract_entity_1 = require("./abstract.entity");
const company_entity_1 = require("./company.entity");
const country_entity_1 = require("./country.entity");
let CompanyParameterEntity = class CompanyParameterEntity extends abstract_entity_1.AbstractEntity {
};
exports.CompanyParameterEntity = CompanyParameterEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    __metadata("design:type", Number)
], CompanyParameterEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], CompanyParameterEntity.prototype, "companyId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], CompanyParameterEntity.prototype, "clientEncryptFile", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], CompanyParameterEntity.prototype, "baseCountryId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => country_entity_1.CountryEntity),
    (0, typeorm_1.JoinColumn)({ name: 'base_country_id' }),
    __metadata("design:type", country_entity_1.CountryEntity)
], CompanyParameterEntity.prototype, "country", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => company_entity_1.CompanyEntity, e => e.companyParameter),
    (0, typeorm_1.JoinColumn)({ name: 'company_id' }),
    __metadata("design:type", company_entity_1.CompanyEntity)
], CompanyParameterEntity.prototype, "company", void 0);
exports.CompanyParameterEntity = CompanyParameterEntity = __decorate([
    (0, typeorm_1.Entity)({ name: enums_1.ETableName.COMPANY_PARAMETER })
], CompanyParameterEntity);
//# sourceMappingURL=company-parameter.entity.js.map