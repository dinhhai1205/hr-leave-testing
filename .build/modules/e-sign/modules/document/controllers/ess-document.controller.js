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
exports.EssDocumentController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const constants_1 = require("../../../../../common/constants");
const decorators_1 = require("../../../../../common/decorators");
const dto_1 = require("../../../../../common/dto");
const enums_1 = require("../../../../../common/enums");
const authentication_1 = require("../../../../../core/iam/authentication");
const decorators_2 = require("../../../../../core/iam/decorators");
const enums_2 = require("../../../../../core/iam/enums");
const constants_2 = require("../../../constants");
const enums_3 = require("../../../enums");
const dtos_1 = require("../../../modules/document/dtos");
const ess_document_service_1 = require("../services/ess-document.service");
let EssDocumentController = class EssDocumentController {
    constructor(essDocumentService) {
        this.essDocumentService = essDocumentService;
    }
    async getAllEssDocuments({ companyId }, query, { userEmail }) {
        return this.essDocumentService.getAllEssDocuments({
            ...query,
            companyId,
            userEmail,
        });
    }
    async getDocumentById(companyId, documentId, { userEmail }) {
        return this.essDocumentService.getEssDocumentById({
            companyId,
            documentId,
            userEmail,
        });
    }
    async downloadDocument(documentId, companyId, type, { email }) {
        const { data } = await this.essDocumentService.downloadEssDocuments({
            documentId,
            companyId,
            downloadType: type,
            userEmail: email,
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
    async getDocumentFileContent(companyId, documentId, documentFileId, { email }) {
        const { fileBuffer, mineType, name, size } = await this.essDocumentService.getEssDocumentFileContent({
            companyId,
            documentFileId,
            documentId,
            userEmail: email,
        });
        return new common_1.StreamableFile(Buffer.from(fileBuffer), {
            disposition: `attachment; filename="${name}.pdf"`,
            length: size,
            type: mineType,
        });
    }
};
exports.EssDocumentController = EssDocumentController;
__decorate([
    (0, common_1.Get)(),
    (0, authentication_1.Auth)(enums_2.AuthType.Bearer, enums_2.AuthType.Permission),
    (0, decorators_2.Permissions)(enums_1.EApiAppMode.ESS, { selectedEmployeeFields: { id: true } }),
    (0, swagger_1.ApiOperation)({ summary: 'Get all ESS documents' }),
    (0, decorators_1.ApiOkResponsePaginated)(dtos_1.DocumentResponseDto),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, decorators_2.ActiveUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.BaseParamDto,
        dtos_1.GetAllEssDocumentsQueryDto, Object]),
    __metadata("design:returntype", Promise)
], EssDocumentController.prototype, "getAllEssDocuments", null);
__decorate([
    (0, common_1.Get)(':documentId'),
    (0, authentication_1.Auth)(enums_2.AuthType.Bearer, enums_2.AuthType.Permission),
    (0, swagger_1.ApiOperation)({ summary: 'Get ESS document by id' }),
    (0, decorators_2.Permissions)(enums_1.EApiAppMode.ESS, { selectedEmployeeFields: { id: true } }),
    (0, swagger_1.ApiResponse)({ type: dtos_1.DocumentResponseDto }),
    __param(0, (0, common_1.Param)('companyId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('documentId', common_1.ParseIntPipe)),
    __param(2, (0, decorators_2.ActiveUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object]),
    __metadata("design:returntype", Promise)
], EssDocumentController.prototype, "getDocumentById", null);
__decorate([
    (0, common_1.Get)('/:documentId/download'),
    (0, decorators_2.Permissions)(enums_1.EApiAppMode.ESS, {
        selectedEmployeeFields: { id: true, email: true },
    }),
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
    __param(3, (0, decorators_2.ActiveEss)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String, Object]),
    __metadata("design:returntype", Promise)
], EssDocumentController.prototype, "downloadDocument", null);
__decorate([
    (0, common_1.Get)(':documentId/file/:documentFileId/download'),
    (0, authentication_1.Auth)(enums_2.AuthType.Bearer, enums_2.AuthType.Permission),
    (0, decorators_2.Permissions)(enums_1.EApiAppMode.ESS, { selectedEmployeeFields: { id: true } }),
    (0, swagger_1.ApiOperation)({
        summary: 'Download file content of a document file. Status options: completed, in_progress, expired, scheduled, in_progress, declined, recalled',
    }),
    (0, decorators_1.ApiFileResponse)(),
    __param(0, (0, common_1.Param)('companyId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('documentId', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Param)('documentFileId', common_1.ParseIntPipe)),
    __param(3, (0, decorators_2.ActiveEss)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number, Object]),
    __metadata("design:returntype", Promise)
], EssDocumentController.prototype, "getDocumentFileContent", null);
exports.EssDocumentController = EssDocumentController = __decorate([
    (0, swagger_1.ApiTags)(constants_2.ESS_DOCUMENT_API_TAG_V1),
    (0, common_1.Controller)(constants_2.ESS_DOCUMENT_API_PATH_V1),
    (0, decorators_2.ModuleMode)(enums_1.EApiModuleMode.ESign),
    __metadata("design:paramtypes", [ess_document_service_1.EssDocumentService])
], EssDocumentController);
//# sourceMappingURL=ess-document.controller.js.map