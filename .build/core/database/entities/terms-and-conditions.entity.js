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
exports.TermsAndConditionsEntity = void 0;
const typeorm_1 = require("typeorm");
const enums_1 = require("../enums");
const abstract_entity_1 = require("./abstract.entity");
let TermsAndConditionsEntity = class TermsAndConditionsEntity extends abstract_entity_1.AbstractEntity {
};
exports.TermsAndConditionsEntity = TermsAndConditionsEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    __metadata("design:type", Number)
], TermsAndConditionsEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], TermsAndConditionsEntity.prototype, "version", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], TermsAndConditionsEntity.prototype, "s3Key", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], TermsAndConditionsEntity.prototype, "bucket", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], TermsAndConditionsEntity.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], TermsAndConditionsEntity.prototype, "updatedBy", void 0);
exports.TermsAndConditionsEntity = TermsAndConditionsEntity = __decorate([
    (0, typeorm_1.Entity)({ name: enums_1.ETableName.TERMS_AND_CONDITIONS })
], TermsAndConditionsEntity);
//# sourceMappingURL=terms-and-conditions.entity.js.map