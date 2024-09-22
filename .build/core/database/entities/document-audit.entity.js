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
exports.DocumentAuditEntity = void 0;
const typeorm_1 = require("typeorm");
const enums_1 = require("../../../modules/e-sign/enums");
const constants_1 = require("../constants");
const enums_2 = require("../enums");
const utils_1 = require("../utils");
const base_app_entity_1 = require("./base-app.entity");
const document_entity_1 = require("./document.entity");
let DocumentAuditEntity = class DocumentAuditEntity extends base_app_entity_1.BaseAppEntity {
};
exports.DocumentAuditEntity = DocumentAuditEntity;
__decorate([
    (0, typeorm_1.Column)(constants_1.BIGINT_COLUMN_TYPE),
    __metadata("design:type", Number)
], DocumentAuditEntity.prototype, "companyId", void 0);
__decorate([
    (0, typeorm_1.Column)(constants_1.BIGINT_COLUMN_TYPE),
    __metadata("design:type", Number)
], DocumentAuditEntity.prototype, "documentId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], DocumentAuditEntity.prototype, "documentStatus", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], DocumentAuditEntity.prototype, "documentName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], DocumentAuditEntity.prototype, "activity", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], DocumentAuditEntity.prototype, "operationType", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: '127.0.0.1' }),
    __metadata("design:type", String)
], DocumentAuditEntity.prototype, "ipAddress", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], DocumentAuditEntity.prototype, "latitude", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], DocumentAuditEntity.prototype, "longitude", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: (0, utils_1.columnType)('JSONB'), nullable: true, select: false }),
    __metadata("design:type", String)
], DocumentAuditEntity.prototype, "payload", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: (0, utils_1.columnType)('JSONB'), nullable: true, select: false }),
    __metadata("design:type", String)
], DocumentAuditEntity.prototype, "data", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => document_entity_1.DocumentEntity, document => document.documentAudits),
    (0, typeorm_1.JoinColumn)({ name: 'document_id' }),
    __metadata("design:type", document_entity_1.DocumentEntity)
], DocumentAuditEntity.prototype, "document", void 0);
exports.DocumentAuditEntity = DocumentAuditEntity = __decorate([
    (0, typeorm_1.Entity)(enums_2.ETableName.DOCUMENT_AUDIT)
], DocumentAuditEntity);
//# sourceMappingURL=document-audit.entity.js.map