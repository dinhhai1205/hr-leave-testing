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
exports.DocumentEntity = void 0;
const typeorm_1 = require("typeorm");
const enums_1 = require("../../../modules/e-sign/enums");
const constants_1 = require("../constants");
const enums_2 = require("../enums");
const utils_1 = require("../utils");
const base_app_entity_1 = require("./base-app.entity");
const document_action_entity_1 = require("./document-action.entity");
const document_audit_entity_1 = require("./document-audit.entity");
const document_file_entity_1 = require("./document-file.entity");
const document_share_entity_1 = require("./document-share.entity");
const document_template_entity_1 = require("./document-template.entity");
const document_type_entity_1 = require("./document-type.entity");
const folder_entity_1 = require("./folder.entity");
let DocumentEntity = class DocumentEntity extends base_app_entity_1.BaseAppEntity {
};
exports.DocumentEntity = DocumentEntity;
__decorate([
    (0, typeorm_1.Column)({ nullable: true, ...constants_1.BIGINT_COLUMN_TYPE }),
    __metadata("design:type", Number)
], DocumentEntity.prototype, "companyId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: 'Sample Document' }),
    __metadata("design:type", String)
], DocumentEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
        enum: enums_1.DocumentStatus,
        default: enums_1.DocumentStatus.Draft,
    }),
    __metadata("design:type", String)
], DocumentEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, ...constants_1.BIGINT_COLUMN_TYPE }),
    __metadata("design:type", Number)
], DocumentEntity.prototype, "recordNo", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
        type: (0, utils_1.columnType)('BOOLEAN'),
        default: (0, utils_1.defaultColumn)({ columnType: 'BOOLEAN', value: true }),
    }),
    __metadata("design:type", Boolean)
], DocumentEntity.prototype, "isSequential", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
        type: (0, utils_1.columnType)('INTEGER'),
        default: 7,
    }),
    __metadata("design:type", Number)
], DocumentEntity.prototype, "expirationDays", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: -1, ...constants_1.BIGINT_COLUMN_TYPE }),
    __metadata("design:type", Number)
], DocumentEntity.prototype, "validity", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], DocumentEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
        type: (0, utils_1.columnType)('BOOLEAN'),
        default: (0, utils_1.defaultColumn)({ columnType: 'BOOLEAN', value: false }),
    }),
    __metadata("design:type", Boolean)
], DocumentEntity.prototype, "emailReminders", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: (0, utils_1.columnType)('INTEGER'), default: 5 }),
    __metadata("design:type", Number)
], DocumentEntity.prototype, "reminderPeriod", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], DocumentEntity.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], DocumentEntity.prototype, "signSubmittedTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, typeorm_1.Index)('idx_document_request_id'),
    __metadata("design:type", String)
], DocumentEntity.prototype, "requestId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: (0, utils_1.columnType)('DATETIME') }),
    __metadata("design:type", Date)
], DocumentEntity.prototype, "completedOn", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: (0, utils_1.columnType)('DATETIME') }),
    __metadata("design:type", Date)
], DocumentEntity.prototype, "declinedOn", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], DocumentEntity.prototype, "declinedReason", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: (0, utils_1.columnType)('DATETIME') }),
    __metadata("design:type", Date)
], DocumentEntity.prototype, "recalledOn", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], DocumentEntity.prototype, "recalledReason", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: (0, utils_1.columnType)('DATETIME') }),
    __metadata("design:type", Date)
], DocumentEntity.prototype, "expiredOn", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: (0, utils_1.columnType)('DATETIME') }),
    __metadata("design:type", Date)
], DocumentEntity.prototype, "extendedDate", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], DocumentEntity.prototype, "owner", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: (0, utils_1.columnType)('BOOLEAN'),
        default: (0, utils_1.defaultColumn)({ columnType: 'BOOLEAN', value: false }),
    }),
    __metadata("design:type", Boolean)
], DocumentEntity.prototype, "isBulk", void 0);
__decorate([
    (0, typeorm_1.Column)({ ...constants_1.JSON_COLUMN_TYPE, nullable: true }),
    __metadata("design:type", Object)
], DocumentEntity.prototype, "bulkActions", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, ...constants_1.BIGINT_COLUMN_TYPE }),
    (0, typeorm_1.Index)('idx_document_folder_id'),
    __metadata("design:type", Number)
], DocumentEntity.prototype, "folderId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, ...constants_1.BIGINT_COLUMN_TYPE }),
    (0, typeorm_1.Index)('idx_document_document_type_id'),
    __metadata("design:type", Number)
], DocumentEntity.prototype, "documentTypeId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, ...constants_1.BIGINT_COLUMN_TYPE }),
    (0, typeorm_1.Index)('idx_document_document_template_id'),
    __metadata("design:type", Number)
], DocumentEntity.prototype, "documentTemplateId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => folder_entity_1.FolderEntity, folder => folder.documents),
    (0, typeorm_1.JoinColumn)({ name: 'folder_id' }),
    __metadata("design:type", folder_entity_1.FolderEntity)
], DocumentEntity.prototype, "folder", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => document_type_entity_1.DocumentTypeEntity, docType => docType.documents),
    (0, typeorm_1.JoinColumn)({ name: 'document_type_id' }),
    __metadata("design:type", document_type_entity_1.DocumentTypeEntity)
], DocumentEntity.prototype, "documentType", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => document_template_entity_1.DocumentTemplateEntity, template => template.document),
    (0, typeorm_1.JoinColumn)({ name: 'document_template_id' }),
    __metadata("design:type", document_template_entity_1.DocumentTemplateEntity)
], DocumentEntity.prototype, "documentTemplate", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => document_action_entity_1.DocumentActionEntity, action => action.document),
    __metadata("design:type", Array)
], DocumentEntity.prototype, "documentActions", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => document_file_entity_1.DocumentFileEntity, file => file.document),
    __metadata("design:type", Array)
], DocumentEntity.prototype, "documentFiles", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => document_share_entity_1.DocumentShareEntity, share => share.document),
    __metadata("design:type", Array)
], DocumentEntity.prototype, "documentShares", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => document_audit_entity_1.DocumentAuditEntity, audit => audit.document),
    __metadata("design:type", Array)
], DocumentEntity.prototype, "documentAudits", void 0);
exports.DocumentEntity = DocumentEntity = __decorate([
    (0, typeorm_1.Entity)({ name: enums_2.ETableName.DOCUMENT }),
    (0, typeorm_1.Index)('idx_document_is_deleted_company_id', ['isDeleted', 'companyId']),
    (0, typeorm_1.Index)('idx_document_id_is_deleted_company_id', [
        'isDeleted',
        'companyId',
        'id',
    ]),
    (0, typeorm_1.Index)('idx_document_is_deleted_company_id_status_id', [
        'isDeleted',
        'companyId',
        'status',
        'id',
    ]),
    (0, typeorm_1.Index)('idx_document_order_created_on_by_desc', obj => ({
        [obj['createdOn']]: -1,
        [obj['id']]: 1,
    }))
], DocumentEntity);
//# sourceMappingURL=document.entity.js.map