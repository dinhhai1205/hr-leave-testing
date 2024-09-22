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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentAuditController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const decorators_1 = require("../../../../common/decorators");
const enums_1 = require("../../../../common/enums");
const authentication_1 = require("../../../../core/iam/authentication");
const decorators_2 = require("../../../../core/iam/decorators");
const enums_2 = require("../../../../core/iam/enums");
const constants_1 = require("../../constants");
const dtos_1 = require("../../modules/document-audit/dtos");
const document_audit_service_1 = require("./document-audit.service");
let DocumentAuditController = class DocumentAuditController {
    constructor(documentAuditService) {
        this.documentAuditService = documentAuditService;
    }
    async getAllDocumentAudits(companyId, documentId, query) {
        return this.documentAuditService.getAllDocumentAudits({
            ...query,
            companyId,
            documentId,
        });
    }
};
exports.DocumentAuditController = DocumentAuditController;
__decorate([
    (0, common_1.Get)(),
    (0, authentication_1.Auth)(enums_2.AuthType.Bearer, enums_2.AuthType.Permission),
    (0, decorators_2.Permissions)(enums_1.EApiAppMode.ADMIN, enums_1.EPermissionActions.VIEW),
    (0, swagger_1.ApiOperation)({ summary: 'Get activity history of a document' }),
    (0, decorators_1.ApiOkResponsePaginated)(dtos_1.DocumentAuditResponseDto),
    __param(0, (0, common_1.Param)('companyId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('documentId', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, dtos_1.GetAllDocumentAuditsQueryDto]),
    __metadata("design:returntype", Promise)
], DocumentAuditController.prototype, "getAllDocumentAudits", null);
exports.DocumentAuditController = DocumentAuditController = __decorate([
    (0, swagger_1.ApiTags)(constants_1.DOCUMENT_AUDIT_API_TAG_V1),
    (0, common_1.Controller)(constants_1.DOCUMENT_AUDIT_API_PATH_V1),
    (0, decorators_2.ModuleMode)(enums_1.EApiModuleMode.ESign),
    __metadata("design:paramtypes", [document_audit_service_1.DocumentAuditService])
], DocumentAuditController);
//# sourceMappingURL=document-audit.controller.js.map