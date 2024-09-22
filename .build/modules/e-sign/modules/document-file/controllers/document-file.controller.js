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
exports.DocumentFileController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const decorators_1 = require("../../../../../common/decorators");
const enums_1 = require("../../../../../common/enums");
const utils_1 = require("../../../../../common/utils");
const authentication_1 = require("../../../../../core/iam/authentication");
const decorators_2 = require("../../../../../core/iam/decorators");
const enums_2 = require("../../../../../core/iam/enums");
const constants_1 = require("../../../constants");
const document_audit_interceptor_1 = require("../../../modules/document-audit/document-audit.interceptor");
const document_file_response_dto_1 = require("../../../modules/document-file/dtos/document-file-response.dto");
const replace_document_file_body_dto_1 = require("../../../modules/document-file/dtos/replace-document-file-body.dto");
const document_file_service_1 = require("../services/document-file.service");
let DocumentFileController = class DocumentFileController {
    constructor(documentFileService) {
        this.documentFileService = documentFileService;
    }
    async getDocumentFileContent(companyId, documentId, documentFileId) {
        const { fileBuffer, mineType, name, size } = await this.documentFileService.getDocumentFileContent({
            companyId,
            documentFileId,
            documentId,
        });
        return new common_1.StreamableFile(Buffer.from(fileBuffer), {
            disposition: `attachment; filename="${name}.pdf"`,
            length: size,
            type: mineType,
        });
    }
    async replaceDocumentFile(companyId, documentId, documentFileId, body, file, { userEmail }) {
        return this.documentFileService.replaceDocumentFile({
            companyId,
            documentId,
            documentFileId,
            userEmail,
            ...body,
            ...file,
        });
    }
    async deleteDocumentFile(companyId, documentId, documentFileId, { userEmail }) {
        return this.documentFileService.deleteDocumentFile({ companyId, documentFileId, documentId }, { userEmail });
    }
};
exports.DocumentFileController = DocumentFileController;
__decorate([
    (0, common_1.Get)(':documentFileId/download'),
    (0, authentication_1.Auth)(enums_2.AuthType.Bearer, enums_2.AuthType.Permission),
    (0, decorators_2.Permissions)(enums_1.EApiAppMode.ADMIN, enums_1.EPermissionActions.VIEW),
    (0, swagger_1.ApiOperation)({
        summary: 'Download file content of a document file. Status options: completed, in_progress, expired, scheduled, in_progress, declined, recalled',
    }),
    (0, decorators_1.ApiFileResponse)(),
    __param(0, (0, common_1.Param)('companyId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('documentId', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Param)('documentFileId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number]),
    __metadata("design:returntype", Promise)
], DocumentFileController.prototype, "getDocumentFileContent", null);
__decorate([
    (0, common_1.Put)(':documentFileId/replace'),
    (0, common_1.UseInterceptors)(document_audit_interceptor_1.DocumentAuditInterceptor),
    (0, authentication_1.Auth)(enums_2.AuthType.Bearer, enums_2.AuthType.Permission),
    (0, decorators_2.Permissions)(enums_1.EApiAppMode.ADMIN, enums_1.EPermissionActions.EDIT),
    (0, decorators_1.FilesUpload)({
        singleUpload: true,
        multerOptions: {
            limits: { fileSize: 25 * enums_1.StorageUnitInByte.OneMb },
            fileFilter: (0, utils_1.filesSupportedFilter)(constants_1.DOCUMENTS_SUPPORT),
        },
        summary: 'Replace existing document file. Status options: draft, correction',
        additionBodyDto: replace_document_file_body_dto_1.ReplaceDocumentFileBodyDto,
    }),
    (0, swagger_1.ApiResponse)({ type: document_file_response_dto_1.DocumentFileResponseDto }),
    __param(0, (0, common_1.Param)('companyId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('documentId', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Param)('documentFileId', common_1.ParseIntPipe)),
    __param(3, (0, common_1.Body)()),
    __param(4, (0, common_1.UploadedFile)('file')),
    __param(5, (0, decorators_2.ActiveUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number, replace_document_file_body_dto_1.ReplaceDocumentFileBodyDto, Object, Object]),
    __metadata("design:returntype", Promise)
], DocumentFileController.prototype, "replaceDocumentFile", null);
__decorate([
    (0, common_1.Delete)(':documentFileId'),
    (0, authentication_1.Auth)(enums_2.AuthType.Bearer, enums_2.AuthType.Permission),
    (0, swagger_1.ApiOperation)({ summary: 'Delete document file by documentId' }),
    (0, decorators_2.Permissions)(enums_1.EApiAppMode.ADMIN, enums_1.EPermissionActions.DELETE),
    __param(0, (0, common_1.Param)('companyId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('documentId', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Param)('documentFileId', common_1.ParseIntPipe)),
    __param(3, (0, decorators_2.ActiveUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number, Object]),
    __metadata("design:returntype", Promise)
], DocumentFileController.prototype, "deleteDocumentFile", null);
exports.DocumentFileController = DocumentFileController = __decorate([
    (0, swagger_1.ApiTags)(constants_1.DOCUMENT_FILE_API_TAG_V1),
    (0, common_1.Controller)(constants_1.DOCUMENT_FILE_API_PATH_V1),
    (0, decorators_2.ModuleMode)(enums_1.EApiModuleMode.ESign),
    __metadata("design:paramtypes", [document_file_service_1.DocumentFileService])
], DocumentFileController);
//# sourceMappingURL=document-file.controller.js.map