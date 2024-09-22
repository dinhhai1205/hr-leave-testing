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
exports.DocumentActionEntity = void 0;
const typeorm_1 = require("typeorm");
const enums_1 = require("../../../modules/e-sign/enums");
const constants_1 = require("../constants");
const enums_2 = require("../enums");
const utils_1 = require("../utils");
const base_app_entity_1 = require("./base-app.entity");
const document_entity_1 = require("./document.entity");
let DocumentActionEntity = class DocumentActionEntity extends base_app_entity_1.BaseAppEntity {
};
exports.DocumentActionEntity = DocumentActionEntity;
__decorate([
    (0, typeorm_1.Column)(constants_1.BIGINT_COLUMN_TYPE),
    __metadata("design:type", Number)
], DocumentActionEntity.prototype, "companyId", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: enums_1.DocumentActionType.Sign }),
    __metadata("design:type", String)
], DocumentActionEntity.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], DocumentActionEntity.prototype, "recipientName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, typeorm_1.Index)('idx_document_action_recipient_email'),
    __metadata("design:type", String)
], DocumentActionEntity.prototype, "recipientEmail", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: (0, utils_1.columnType)('INTEGER'), default: 1 }),
    __metadata("design:type", Number)
], DocumentActionEntity.prototype, "signingOrder", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], DocumentActionEntity.prototype, "inPersonName", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], DocumentActionEntity.prototype, "inPersonEmail", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: enums_1.DocumentActionStatus.NoAction }),
    __metadata("design:type", String)
], DocumentActionEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: enums_1.DocumentActionDeliveryMode.Email }),
    __metadata("design:type", String)
], DocumentActionEntity.prototype, "deliveryMode", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], DocumentActionEntity.prototype, "privateNote", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], DocumentActionEntity.prototype, "zohoActionId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], DocumentActionEntity.prototype, "recipientCountrycode", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], DocumentActionEntity.prototype, "recipientCountrycodeIso", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], DocumentActionEntity.prototype, "recipientPhonenumber", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: (0, utils_1.columnType)('BOOLEAN'),
        default: (0, utils_1.defaultColumn)({ columnType: 'BOOLEAN', value: false }),
    }),
    __metadata("design:type", Boolean)
], DocumentActionEntity.prototype, "verifyRecipient", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: enums_1.DocumentActionVerificationType.None }),
    __metadata("design:type", String)
], DocumentActionEntity.prototype, "verificationType", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], DocumentActionEntity.prototype, "verificationCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: enums_1.DocumentActionLanguageCode.English }),
    __metadata("design:type", String)
], DocumentActionEntity.prototype, "language", void 0);
__decorate([
    (0, typeorm_1.Column)({ ...constants_1.JSON_COLUMN_TYPE, nullable: true }),
    __metadata("design:type", Object)
], DocumentActionEntity.prototype, "fields", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: (0, utils_1.columnType)('INTEGER') }),
    __metadata("design:type", Number)
], DocumentActionEntity.prototype, "recipientIndex", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: (0, utils_1.columnType)('BOOLEAN'),
        default: (0, utils_1.defaultColumn)({ columnType: 'BOOLEAN', value: false }),
    }),
    __metadata("design:type", Boolean)
], DocumentActionEntity.prototype, "isBulk", void 0);
__decorate([
    (0, typeorm_1.Column)(constants_1.BIGINT_COLUMN_TYPE),
    __metadata("design:type", Number)
], DocumentActionEntity.prototype, "documentId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => document_entity_1.DocumentEntity, document => document.documentActions),
    (0, typeorm_1.JoinColumn)({ name: 'document_id' }),
    __metadata("design:type", document_entity_1.DocumentEntity)
], DocumentActionEntity.prototype, "document", void 0);
exports.DocumentActionEntity = DocumentActionEntity = __decorate([
    (0, typeorm_1.Entity)({ name: enums_2.ETableName.DOCUMENT_ACTION }),
    (0, typeorm_1.Index)('idx_documentActions_document_id', ['isDeleted', 'documentId'])
], DocumentActionEntity);
//# sourceMappingURL=document-action.entity.js.map