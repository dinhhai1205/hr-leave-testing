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
exports.DocumentController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const constants_1 = require("../../../../../common/constants");
const decorators_1 = require("../../../../../common/decorators");
const dto_1 = require("../../../../../common/dto");
const enums_1 = require("../../../../../common/enums");
const utils_1 = require("../../../../../common/utils");
const authentication_1 = require("../../../../../core/iam/authentication");
const decorators_2 = require("../../../../../core/iam/decorators");
const enums_2 = require("../../../../../core/iam/enums");
const constants_2 = require("../../../constants");
const enums_3 = require("../../../enums");
const document_audit_interceptor_1 = require("../../../modules/document-audit/document-audit.interceptor");
const dtos_1 = require("../../../modules/document/dtos");
const document_service_1 = require("../services/document.service");
let DocumentController = class DocumentController {
    constructor(documentService) {
        this.documentService = documentService;
    }
    async createDocument({ companyId }, { name, isSequential }, file, { userEmail }) {
        return this.documentService.createDocument({
            name,
            file,
            isSequential,
            companyId,
            userEmail,
        });
    }
    async submitDocument(companyId, documentId, { userEmail }) {
        return this.documentService.submitDocumentToZoho({
            companyId,
            documentId,
            userEmail,
        });
    }
    async getAllDocuments({ companyId }, query) {
        return this.documentService.getAllDocuments({
            ...query,
            companyId,
        });
    }
    async getDocumentAsNew(companyId, documentId) {
        return this.documentService.getDocumentAsNew({ companyId, documentId });
    }
    async getDocumentById(companyId, documentId) {
        return this.documentService.getDocumentById({ companyId, documentId });
    }
    async downloadDocuments(documentId, companyId, type, userEmail) {
        const { data } = await this.documentService.downloadDocuments({
            documentId,
            companyId,
            downloadType: type,
            userEmail,
        });
        const { isZip, buffer } = data;
        const fileBuffer = Buffer.from(buffer);
        let fileExt = 'pdf';
        let contentType = constants_1.CONTENT_TYPE.PDF;
        if (isZip) {
            fileExt = 'zip';
            contentType = constants_1.CONTENT_TYPE.ZIP;
        }
        return new common_1.StreamableFile(fileBuffer, {
            disposition: `attachment; filename="${companyId}-${documentId}-documents.${fileExt}"`,
            type: contentType,
            length: fileBuffer.byteLength,
        });
    }
    async recallDocument(companyId, documentId, { userEmail }, { reason }) {
        return this.documentService.recallDocument({
            companyId,
            documentId,
            userEmail,
            reason,
        });
    }
    async remindRecipients(companyId, documentId, { userEmail }) {
        return this.documentService.remindRecipients({
            companyId,
            documentId,
            userEmail,
        });
    }
    async extendDocument(companyId, documentId, { extendedDate }, { userEmail }) {
        return this.documentService.extendDocument({
            companyId,
            documentId,
            extendedDate,
            userEmail,
        });
    }
    async updateDocumentSetting(companyId, documentId, body, { userEmail }) {
        return this.documentService.updateDocumentSetting({
            ...body,
            companyId,
            documentId,
            userEmail,
        });
    }
    async deleteMultipleDocuments({ companyId }, body, { userEmail }) {
        return this.documentService.deleteMultipleDocuments({
            ...body,
            companyId,
            userEmail,
        });
    }
    async updateNewDocumentFile(companyId, documentId, { name, order }, file, { userEmail }) {
        return this.documentService.updateNewDocumentFile({
            filesDto: [{ ...file, name, order: Number(order) }],
            companyId,
            documentId,
            userEmail,
            name,
        });
    }
};
exports.DocumentController = DocumentController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)(document_audit_interceptor_1.DocumentAuditInterceptor),
    (0, authentication_1.Auth)(enums_2.AuthType.Bearer, enums_2.AuthType.Permission),
    (0, decorators_2.Permissions)(enums_1.EApiAppMode.ADMIN, enums_1.EPermissionActions.CREATE),
    (0, decorators_1.FilesUpload)({
        singleUpload: true,
        summary: 'Create new document. Status options: draft',
        multerOptions: {
            limits: { fileSize: 25 * enums_1.StorageUnitInByte.OneMb },
            fileFilter: (0, utils_1.filesSupportedFilter)(constants_2.DOCUMENTS_SUPPORT),
        },
        additionBodyDto: dtos_1.CreateDocumentBodyDto,
    }),
    (0, swagger_1.ApiResponse)({ type: dtos_1.DocumentResponseDto }),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFile)('file')),
    __param(3, (0, decorators_2.ActiveUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.BaseParamDto,
        dtos_1.CreateDocumentBodyDto, Object, Object]),
    __metadata("design:returntype", Promise)
], DocumentController.prototype, "createDocument", null);
__decorate([
    (0, common_1.Post)('/:documentId/submit'),
    (0, common_1.UseInterceptors)(document_audit_interceptor_1.DocumentAuditInterceptor),
    (0, authentication_1.Auth)(enums_2.AuthType.Bearer, enums_2.AuthType.Permission),
    (0, decorators_2.Permissions)(enums_1.EApiAppMode.ADMIN, enums_1.EPermissionActions.EDIT),
    (0, swagger_1.ApiOperation)({ summary: 'Submit document' }),
    __param(0, (0, common_1.Param)('companyId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('documentId', common_1.ParseIntPipe)),
    __param(2, (0, decorators_2.ActiveUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object]),
    __metadata("design:returntype", Promise)
], DocumentController.prototype, "submitDocument", null);
__decorate([
    (0, common_1.Get)(),
    (0, authentication_1.Auth)(enums_2.AuthType.Bearer, enums_2.AuthType.Permission),
    (0, swagger_1.ApiOperation)({ summary: 'Get all documents' }),
    (0, decorators_2.Permissions)(enums_1.EApiAppMode.ADMIN, enums_1.EPermissionActions.VIEW),
    (0, decorators_1.ApiOkResponsePaginated)(dtos_1.DocumentResponseDto),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.BaseParamDto,
        dtos_1.GetAllDocumentsQueryDto]),
    __metadata("design:returntype", Promise)
], DocumentController.prototype, "getAllDocuments", null);
__decorate([
    (0, common_1.Get)(':documentId/as-new'),
    (0, authentication_1.Auth)(enums_2.AuthType.Bearer, enums_2.AuthType.Permission),
    (0, swagger_1.ApiOperation)({ summary: 'Get document as new by id' }),
    (0, decorators_2.Permissions)(enums_1.EApiAppMode.ADMIN, enums_1.EPermissionActions.VIEW),
    (0, swagger_1.ApiResponse)({ type: dtos_1.DocumentResponseDto }),
    __param(0, (0, common_1.Param)('companyId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('documentId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], DocumentController.prototype, "getDocumentAsNew", null);
__decorate([
    (0, common_1.Get)(':documentId'),
    (0, authentication_1.Auth)(enums_2.AuthType.Bearer, enums_2.AuthType.Permission),
    (0, swagger_1.ApiOperation)({ summary: 'Get document by id' }),
    (0, decorators_2.Permissions)(enums_1.EApiAppMode.ADMIN, enums_1.EPermissionActions.VIEW),
    (0, swagger_1.ApiResponse)({ type: dtos_1.DocumentResponseDto }),
    __param(0, (0, common_1.Param)('companyId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('documentId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], DocumentController.prototype, "getDocumentById", null);
__decorate([
    (0, common_1.Get)('/:documentId/download'),
    (0, decorators_2.Permissions)(enums_1.EApiAppMode.ADMIN, enums_1.EPermissionActions.VIEW),
    (0, authentication_1.Auth)(enums_2.AuthType.Bearer, enums_2.AuthType.Permission),
    (0, swagger_1.ApiOperation)({ summary: 'Download all files in a document as zip format' }),
    (0, swagger_1.ApiQuery)({
        name: 'type',
        enum: enums_3.DownloadFileType,
        required: true,
        description: 'Type of files to download',
    }),
    (0, decorators_1.ApiFileResponse)(),
    __param(0, (0, common_1.Param)('documentId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('companyId', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Query)('type', new common_1.ParseEnumPipe(enums_3.DownloadFileType))),
    __param(3, (0, decorators_2.ActiveUser)('userEmail')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String, String]),
    __metadata("design:returntype", Promise)
], DocumentController.prototype, "downloadDocuments", null);
__decorate([
    (0, common_1.Post)(':documentId/recall'),
    (0, common_1.UseInterceptors)(document_audit_interceptor_1.DocumentAuditInterceptor),
    (0, authentication_1.Auth)(enums_2.AuthType.Bearer, enums_2.AuthType.Permission),
    (0, decorators_2.Permissions)(enums_1.EApiAppMode.ADMIN, enums_1.EPermissionActions.EDIT),
    (0, swagger_1.ApiOperation)({
        summary: 'Recall a document. Just in_process document can be processed',
    }),
    __param(0, (0, common_1.Param)('companyId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('documentId', common_1.ParseIntPipe)),
    __param(2, (0, decorators_2.ActiveUser)()),
    __param(3, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object, dtos_1.RecallDocumentBodyDto]),
    __metadata("design:returntype", Promise)
], DocumentController.prototype, "recallDocument", null);
__decorate([
    (0, common_1.Post)(':documentId/remind'),
    (0, common_1.UseInterceptors)(document_audit_interceptor_1.DocumentAuditInterceptor),
    (0, authentication_1.Auth)(enums_2.AuthType.Bearer, enums_2.AuthType.Permission),
    (0, decorators_2.Permissions)(enums_1.EApiAppMode.ADMIN, enums_1.EPermissionActions.CREATE),
    (0, swagger_1.ApiOperation)({
        summary: 'A reminder is sent to the person who needs to sign.',
    }),
    __param(0, (0, common_1.Param)('companyId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('documentId', common_1.ParseIntPipe)),
    __param(2, (0, decorators_2.ActiveUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object]),
    __metadata("design:returntype", Promise)
], DocumentController.prototype, "remindRecipients", null);
__decorate([
    (0, common_1.Put)(':documentId/extend'),
    (0, common_1.UseInterceptors)(document_audit_interceptor_1.DocumentAuditInterceptor),
    (0, authentication_1.Auth)(enums_2.AuthType.Bearer, enums_2.AuthType.Permission),
    (0, decorators_2.Permissions)(enums_1.EApiAppMode.ADMIN, enums_1.EPermissionActions.CREATE),
    (0, swagger_1.ApiOperation)({
        summary: 'A reminder is sent to the person who needs to sign.',
    }),
    __param(0, (0, common_1.Param)('companyId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('documentId', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, decorators_2.ActiveUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, dtos_1.ExtendDocumentBodyDto, Object]),
    __metadata("design:returntype", Promise)
], DocumentController.prototype, "extendDocument", null);
__decorate([
    (0, common_1.Put)(':documentId'),
    (0, common_1.UseInterceptors)(document_audit_interceptor_1.DocumentAuditInterceptor),
    (0, authentication_1.Auth)(enums_2.AuthType.Bearer, enums_2.AuthType.Permission),
    (0, decorators_2.Permissions)(enums_1.EApiAppMode.ADMIN, enums_1.EPermissionActions.EDIT),
    (0, swagger_1.ApiOperation)({
        summary: 'Update document setting. Status options: draft, correction',
    }),
    (0, swagger_1.ApiResponse)({ type: dtos_1.DocumentResponseDto }),
    __param(0, (0, common_1.Param)('companyId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('documentId', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, decorators_2.ActiveUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, dtos_1.UpdateDocumentSettingBodyDto, Object]),
    __metadata("design:returntype", Promise)
], DocumentController.prototype, "updateDocumentSetting", null);
__decorate([
    (0, common_1.Delete)(),
    (0, authentication_1.Auth)(enums_2.AuthType.Bearer, enums_2.AuthType.Permission),
    (0, swagger_1.ApiOperation)({ summary: 'Delete multiple documents' }),
    (0, decorators_2.Permissions)(enums_1.EApiAppMode.ADMIN, enums_1.EPermissionActions.DELETE),
    (0, swagger_1.ApiResponse)({ type: dtos_1.DeleteMultipleDocumentsResponseDto }),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, decorators_2.ActiveUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.BaseParamDto,
        dtos_1.DeleteMultipleDocumentsBodyDto, Object]),
    __metadata("design:returntype", Promise)
], DocumentController.prototype, "deleteMultipleDocuments", null);
__decorate([
    (0, common_1.Put)(':documentId/file'),
    (0, common_1.UseInterceptors)(document_audit_interceptor_1.DocumentAuditInterceptor),
    (0, authentication_1.Auth)(enums_2.AuthType.Bearer, enums_2.AuthType.Permission),
    (0, decorators_2.Permissions)(enums_1.EApiAppMode.ADMIN, enums_1.EPermissionActions.EDIT),
    (0, decorators_1.FilesUpload)({
        singleUpload: true,
        multerOptions: {
            limits: { fileSize: 25 * enums_1.StorageUnitInByte.OneMb },
            fileFilter: (0, utils_1.filesSupportedFilter)(constants_2.DOCUMENTS_SUPPORT),
        },
        summary: 'Add a new file into document. Status options: draft, correction',
        additionBodyDto: dtos_1.UpdateNewDocumentFileBodyDto,
    }),
    (0, swagger_1.ApiResponse)({ type: dtos_1.DocumentResponseDto }),
    __param(0, (0, common_1.Param)('companyId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('documentId', common_1.ParseIntPipe)),
    __param(2, (0, common_1.UploadedFile)('body')),
    __param(3, (0, common_1.UploadedFile)('file')),
    __param(4, (0, decorators_2.ActiveUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, dtos_1.UpdateNewDocumentFileBodyDto, Object, Object]),
    __metadata("design:returntype", Promise)
], DocumentController.prototype, "updateNewDocumentFile", null);
exports.DocumentController = DocumentController = __decorate([
    (0, swagger_1.ApiTags)(constants_2.DOCUMENT_API_TAG_V1),
    (0, common_1.Controller)({ path: constants_2.DOCUMENT_API_PATH_V1 }),
    (0, decorators_2.ModuleMode)(enums_1.EApiModuleMode.ESign),
    __metadata("design:paramtypes", [document_service_1.DocumentService])
], DocumentController);
//# sourceMappingURL=document.controller.js.map