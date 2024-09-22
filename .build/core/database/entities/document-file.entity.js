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
exports.DocumentFileEntity = void 0;
const typeorm_1 = require("typeorm");
const constants_1 = require("../constants");
const enums_1 = require("../enums");
const utils_1 = require("../utils");
const base_app_entity_1 = require("./base-app.entity");
const document_template_entity_1 = require("./document-template.entity");
const document_entity_1 = require("./document.entity");
let DocumentFileEntity = class DocumentFileEntity extends base_app_entity_1.BaseAppEntity {
};
exports.DocumentFileEntity = DocumentFileEntity;
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], DocumentFileEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(constants_1.NUMERIC_COLUMN_TYPE),
    __metadata("design:type", Number)
], DocumentFileEntity.prototype, "size", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: (0, utils_1.columnType)('INTEGER') }),
    __metadata("design:type", Number)
], DocumentFileEntity.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], DocumentFileEntity.prototype, "imageString", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], DocumentFileEntity.prototype, "originalname", void 0);
__decorate([
    (0, typeorm_1.Column)(constants_1.BIGINT_COLUMN_TYPE),
    __metadata("design:type", Number)
], DocumentFileEntity.prototype, "documentId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, ...constants_1.BIGINT_COLUMN_TYPE }),
    __metadata("design:type", Number)
], DocumentFileEntity.prototype, "documentTemplateId", void 0);
__decorate([
    (0, typeorm_1.Column)(constants_1.BIGINT_COLUMN_TYPE),
    __metadata("design:type", Number)
], DocumentFileEntity.prototype, "companyId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => document_entity_1.DocumentEntity, document => document.documentFiles),
    (0, typeorm_1.JoinColumn)({ name: 'document_id' }),
    __metadata("design:type", document_entity_1.DocumentEntity)
], DocumentFileEntity.prototype, "document", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => document_template_entity_1.DocumentTemplateEntity, template => template.documentFiles),
    (0, typeorm_1.JoinColumn)({ name: 'document_template_id' }),
    __metadata("design:type", document_template_entity_1.DocumentTemplateEntity)
], DocumentFileEntity.prototype, "documentTemplate", void 0);
exports.DocumentFileEntity = DocumentFileEntity = __decorate([
    (0, typeorm_1.Entity)({ name: enums_1.ETableName.DOCUMENT_FILE }),
    (0, typeorm_1.Index)('idx_documentFiles_document_id', ['isDeleted', 'documentId'])
], DocumentFileEntity);
//# sourceMappingURL=document-file.entity.js.map