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
exports.CompanyESignDocumentNoEntity = void 0;
const typeorm_1 = require("typeorm");
const enums_1 = require("../enums");
const utils_1 = require("../utils");
let CompanyESignDocumentNoEntity = class CompanyESignDocumentNoEntity {
};
exports.CompanyESignDocumentNoEntity = CompanyESignDocumentNoEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    __metadata("design:type", Number)
], CompanyESignDocumentNoEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: (0, utils_1.columnType)('BOOLEAN'),
        default: (0, utils_1.defaultColumn)({ columnType: 'BOOLEAN', value: false }),
        nullable: true,
    }),
    __metadata("design:type", Boolean)
], CompanyESignDocumentNoEntity.prototype, "isdeleted", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], CompanyESignDocumentNoEntity.prototype, "companyid", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], CompanyESignDocumentNoEntity.prototype, "lastno", void 0);
exports.CompanyESignDocumentNoEntity = CompanyESignDocumentNoEntity = __decorate([
    (0, typeorm_1.Entity)({ name: enums_1.ETableName.COMPANY_E_SIGN_DOCUMENT_NO })
], CompanyESignDocumentNoEntity);
//# sourceMappingURL=company-e-sign-document-no.entity.js.map