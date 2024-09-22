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
exports.DocumentShareEntity = void 0;
const typeorm_1 = require("typeorm");
const constants_1 = require("../constants");
const enums_1 = require("../enums");
const base_app_entity_1 = require("./base-app.entity");
const document_entity_1 = require("./document.entity");
let DocumentShareEntity = class DocumentShareEntity extends base_app_entity_1.BaseAppEntity {
};
exports.DocumentShareEntity = DocumentShareEntity;
__decorate([
    (0, typeorm_1.Column)(constants_1.BIGINT_COLUMN_TYPE),
    __metadata("design:type", Number)
], DocumentShareEntity.prototype, "documentId", void 0);
__decorate([
    (0, typeorm_1.Column)(constants_1.BIGINT_COLUMN_TYPE),
    __metadata("design:type", Number)
], DocumentShareEntity.prototype, "companyId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, typeorm_1.Index)('idx_document_share_shared_with_email'),
    __metadata("design:type", String)
], DocumentShareEntity.prototype, "sharedWithEmail", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], DocumentShareEntity.prototype, "sharedByUser", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], DocumentShareEntity.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => document_entity_1.DocumentEntity, doc => doc.documentShares),
    (0, typeorm_1.JoinColumn)({ name: 'document_id' }),
    __metadata("design:type", document_entity_1.DocumentEntity)
], DocumentShareEntity.prototype, "document", void 0);
exports.DocumentShareEntity = DocumentShareEntity = __decorate([
    (0, typeorm_1.Entity)({ name: enums_1.ETableName.DOCUMENT_SHARE }),
    (0, typeorm_1.Index)('idx_document_share_is_deleted_company_id_document_id', [
        'isDeleted',
        'companyId',
        'documentId',
    ]),
    (0, typeorm_1.Index)('idx_document_share_order_created_on_by_desc', obj => ({
        [obj['createdOn']]: -1,
        [obj['id']]: 1,
    }))
], DocumentShareEntity);
//# sourceMappingURL=document-share.entity.js.map