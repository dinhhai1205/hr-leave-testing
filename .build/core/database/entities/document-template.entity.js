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
exports.DocumentTemplateEntity = void 0;
const typeorm_1 = require("typeorm");
const constants_1 = require("../constants");
const enums_1 = require("../enums");
const utils_1 = require("../utils");
const base_app_entity_1 = require("./base-app.entity");
const document_file_entity_1 = require("./document-file.entity");
const document_type_entity_1 = require("./document-type.entity");
const document_entity_1 = require("./document.entity");
const folder_entity_1 = require("./folder.entity");
let DocumentTemplateEntity = class DocumentTemplateEntity extends base_app_entity_1.BaseAppEntity {
};
exports.DocumentTemplateEntity = DocumentTemplateEntity;
__decorate([
    (0, typeorm_1.Column)({ nullable: true, ...constants_1.BIGINT_COLUMN_TYPE }),
    __metadata("design:type", Number)
], DocumentTemplateEntity.prototype, "companyId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: 'Sample Document' }),
    __metadata("design:type", String)
], DocumentTemplateEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
        type: (0, utils_1.columnType)('BOOLEAN'),
        default: (0, utils_1.defaultColumn)({ columnType: 'BOOLEAN', value: true }),
    }),
    __metadata("design:type", Boolean)
], DocumentTemplateEntity.prototype, "isSequential", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
        type: (0, utils_1.columnType)('INTEGER'),
        default: 7,
    }),
    __metadata("design:type", Number)
], DocumentTemplateEntity.prototype, "expirationDays", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: -1, ...constants_1.BIGINT_COLUMN_TYPE }),
    __metadata("design:type", Number)
], DocumentTemplateEntity.prototype, "validity", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], DocumentTemplateEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
        type: (0, utils_1.columnType)('BOOLEAN'),
        default: (0, utils_1.defaultColumn)({ columnType: 'BOOLEAN', value: false }),
    }),
    __metadata("design:type", Boolean)
], DocumentTemplateEntity.prototype, "emailReminders", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: (0, utils_1.columnType)('INTEGER'), default: 5 }),
    __metadata("design:type", Number)
], DocumentTemplateEntity.prototype, "reminderPeriod", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], DocumentTemplateEntity.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], DocumentTemplateEntity.prototype, "owner", void 0);
__decorate([
    (0, typeorm_1.Column)(constants_1.JSON_COLUMN_TYPE),
    __metadata("design:type", Array)
], DocumentTemplateEntity.prototype, "documentActions", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: (0, utils_1.columnType)('BOOLEAN'),
        default: (0, utils_1.defaultColumn)({ columnType: 'BOOLEAN', value: false }),
    }),
    __metadata("design:type", Boolean)
], DocumentTemplateEntity.prototype, "isBulk", void 0);
__decorate([
    (0, typeorm_1.Column)({ ...constants_1.JSON_COLUMN_TYPE, nullable: true }),
    __metadata("design:type", Object)
], DocumentTemplateEntity.prototype, "bulkActions", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, ...constants_1.BIGINT_COLUMN_TYPE }),
    (0, typeorm_1.Index)('idx_document_folder_id'),
    __metadata("design:type", Number)
], DocumentTemplateEntity.prototype, "folderId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, ...constants_1.BIGINT_COLUMN_TYPE }),
    (0, typeorm_1.Index)('idx_document_document_type_id'),
    __metadata("design:type", Number)
], DocumentTemplateEntity.prototype, "documentTypeId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => folder_entity_1.FolderEntity, folder => folder.documents),
    (0, typeorm_1.JoinColumn)({ name: 'folder_id' }),
    __metadata("design:type", folder_entity_1.FolderEntity)
], DocumentTemplateEntity.prototype, "folder", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => document_type_entity_1.DocumentTypeEntity, docType => docType.documents),
    (0, typeorm_1.JoinColumn)({ name: 'document_type_id' }),
    __metadata("design:type", document_type_entity_1.DocumentTypeEntity)
], DocumentTemplateEntity.prototype, "documentType", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => document_entity_1.DocumentEntity, document => document.documentTemplate),
    __metadata("design:type", document_entity_1.DocumentEntity)
], DocumentTemplateEntity.prototype, "document", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => document_file_entity_1.DocumentFileEntity, file => file.documentTemplate),
    __metadata("design:type", Array)
], DocumentTemplateEntity.prototype, "documentFiles", void 0);
exports.DocumentTemplateEntity = DocumentTemplateEntity = __decorate([
    (0, typeorm_1.Entity)({ name: enums_1.ETableName.DOCUMENT_TEMPLATE })
], DocumentTemplateEntity);
//# sourceMappingURL=document-template.entity.js.map