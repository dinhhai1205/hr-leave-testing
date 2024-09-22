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
exports.DocumentTemplateController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const decorators_1 = require("../../../../../common/decorators");
const dto_1 = require("../../../../../common/dto");
const enums_1 = require("../../../../../common/enums");
const authentication_1 = require("../../../../../core/iam/authentication");
const decorators_2 = require("../../../../../core/iam/decorators");
const enums_2 = require("../../../../../core/iam/enums");
const constants_1 = require("../../../constants");
const document_1 = require("../../../modules/document");
const utils_1 = require("../../../../../common/utils");
const document_template_service_1 = require("../../../modules/document-template/document-template.service");
const create_document_from_template_body_dto_1 = require("../../../modules/document-template/dtos/create-document-from-template-body.dto");
const create_document_template_body_dto_1 = require("../../../modules/document-template/dtos/create-document-template-body.dto");
const delete_multiple_document_templates_body_dto_1 = require("../../../modules/document-template/dtos/delete-multiple-document-templates-body.dto");
const document_template_response_dto_1 = require("../../../modules/document-template/dtos/document-template-response.dto");
const get_all_documents_template_query_dto_1 = require("../../../modules/document-template/dtos/get-all-documents-template-query.dto");
const update_document_template_setting_body_dto_1 = require("../../../modules/document-template/dtos/update-document-template-setting-body.dto");
const document_file_response_dto_1 = require("../../document-file/dtos/document-file-response.dto");
const replace_document_file_body_dto_1 = require("../../document-file/dtos/replace-document-file-body.dto");
let DocumentTemplateController = class DocumentTemplateController {
    constructor(documentTemplateService) {
        this.documentTemplateService = documentTemplateService;
    }
    async createDocumentTemplate({ companyId }, { name, isSequential }, file, { userEmail }) {
        return this.documentTemplateService.createDocumentTemplate({
            name,
            file,
            isSequential,
            companyId,
            userEmail,
        });
    }
    async getDocumentTemplateFileContent(companyId, documentTemplateId, documentFileId) {
        const { fileBuffer, mineType, name, size } = await this.documentTemplateService.getDocumentTemplateFileContent({
            companyId,
            documentFileId,
            documentTemplateId,
        });
        return new common_1.StreamableFile(Buffer.from(fileBuffer), {
            disposition: `attachment; filename="${name}.pdf"`,
            length: size,
            type: mineType,
        });
    }
    async getDocumentTemplateById(companyId, documentTemplateId) {
        return this.documentTemplateService.getDocumentTemplateById({
            companyId,
            documentTemplateId,
        });
    }
    async getAllDocumentTemplates(companyId, query) {
        return this.documentTemplateService.getAllDocumentTemplates({
            ...query,
            companyId,
        });
    }
    async updateDocumentTemplateSetting(companyId, documentTemplateId, body, { userEmail }) {
        return this.documentTemplateService.updateDocumentTemplateSetting({
            ...body,
            companyId,
            documentTemplateId,
            userEmail,
        });
    }
    async deleteMultipleDocumentTemplates({ companyId }, body, { userEmail }) {
        return this.documentTemplateService.deleteMultipleDocumentTemplates({
            ...body,
            companyId,
            userEmail,
        });
    }
    async updateNewTemplateFile(companyId, documentTemplateId, { name, order }, file, { userEmail }) {
        return this.documentTemplateService.updateNewTemplateFile({
            filesDto: [{ ...file, name, order: Number(order) }],
            companyId,
            documentTemplateId,
            userEmail,
            name,
        });
    }
    async replaceDocumentFile(companyId, documentFileId, documentTemplateId, body, file, { userEmail }) {
        const { data } = await this.documentTemplateService.replaceDocumentTemplateFile({
            companyId,
            documentFileId,
            documentTemplateId,
            userEmail,
            ...body,
            ...file,
        });
        return data;
    }
    async deleteDocumentFile(companyId, documentTemplateId, documentFileId, { userEmail }) {
        return this.documentTemplateService.deleteDocumentTemplateFile({
            companyId,
            documentFileId,
            documentTemplateId,
            userEmail,
        });
    }
    async createDocumentFromTemplate(companyId, documentTemplateId, { userEmail }, body) {
        return this.documentTemplateService.createDocumentFromTemplate({
            ...body,
            userEmail,
            companyId,
            documentTemplateId,
        });
    }
};
exports.DocumentTemplateController = DocumentTemplateController;
__decorate([
    (0, common_1.Post)(),
    (0, authentication_1.Auth)(enums_2.AuthType.Bearer, enums_2.AuthType.Permission),
    (0, decorators_2.Permissions)(enums_1.EApiAppMode.ADMIN, enums_1.EPermissionActions.CREATE),
    (0, decorators_1.FilesUpload)({
        singleUpload: true,
        summary: 'Create new document template',
        multerOptions: {
            limits: { fileSize: 25 * enums_1.StorageUnitInByte.OneMb },
            fileFilter: (0, utils_1.filesSupportedFilter)(constants_1.DOCUMENTS_SUPPORT),
        },
        additionBodyDto: create_document_template_body_dto_1.CreateDocumentTemplateBodyDto,
    }),
    (0, swagger_1.ApiResponse)({ type: document_template_response_dto_1.DocumentTemplateResponseDto }),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFile)('file')),
    __param(3, (0, decorators_2.ActiveUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.BaseParamDto,
        create_document_template_body_dto_1.CreateDocumentTemplateBodyDto, Object, Object]),
    __metadata("design:returntype", Promise)
], DocumentTemplateController.prototype, "createDocumentTemplate", null);
__decorate([
    (0, common_1.Get)(':documentTemplateId/file/:documentFileId/download'),
    (0, authentication_1.Auth)(enums_2.AuthType.Bearer, enums_2.AuthType.Permission),
    (0, decorators_2.Permissions)(enums_1.EApiAppMode.ADMIN, enums_1.EPermissionActions.VIEW),
    (0, swagger_1.ApiOperation)({
        summary: 'Download file content of a document file.',
    }),
    (0, decorators_1.ApiFileResponse)(),
    __param(0, (0, common_1.Param)('companyId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('documentTemplateId', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Param)('documentFileId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number]),
    __metadata("design:returntype", Promise)
], DocumentTemplateController.prototype, "getDocumentTemplateFileContent", null);
__decorate([
    (0, common_1.Get)(':documentTemplateId'),
    (0, authentication_1.Auth)(enums_2.AuthType.Bearer, enums_2.AuthType.Permission),
    (0, swagger_1.ApiOperation)({ summary: 'Get document template by id' }),
    (0, decorators_2.Permissions)(enums_1.EApiAppMode.ADMIN, enums_1.EPermissionActions.VIEW),
    (0, swagger_1.ApiResponse)({ type: document_template_response_dto_1.DocumentTemplateResponseDto }),
    __param(0, (0, common_1.Param)('companyId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('documentTemplateId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], DocumentTemplateController.prototype, "getDocumentTemplateById", null);
__decorate([
    (0, common_1.Get)(),
    (0, authentication_1.Auth)(enums_2.AuthType.Bearer, enums_2.AuthType.Permission),
    (0, swagger_1.ApiOperation)({ summary: 'Get all document templates' }),
    (0, decorators_2.Permissions)(enums_1.EApiAppMode.ADMIN, enums_1.EPermissionActions.VIEW),
    (0, decorators_1.ApiOkResponsePaginated)(document_template_response_dto_1.DocumentTemplateResponseDto),
    __param(0, (0, common_1.Param)('companyId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, get_all_documents_template_query_dto_1.GetAllDocumentsTemplateQueryDto]),
    __metadata("design:returntype", Promise)
], DocumentTemplateController.prototype, "getAllDocumentTemplates", null);
__decorate([
    (0, common_1.Put)(':documentTemplateId'),
    (0, authentication_1.Auth)(enums_2.AuthType.Bearer, enums_2.AuthType.Permission),
    (0, decorators_2.Permissions)(enums_1.EApiAppMode.ADMIN, enums_1.EPermissionActions.EDIT),
    (0, swagger_1.ApiOperation)({
        summary: 'Update document template setting.',
    }),
    (0, swagger_1.ApiResponse)({ type: document_template_response_dto_1.DocumentTemplateResponseDto }),
    __param(0, (0, common_1.Param)('companyId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('documentTemplateId', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, decorators_2.ActiveUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, update_document_template_setting_body_dto_1.UpdateDOcumentTemplateSettingBodyDto, Object]),
    __metadata("design:returntype", Promise)
], DocumentTemplateController.prototype, "updateDocumentTemplateSetting", null);
__decorate([
    (0, common_1.Delete)(),
    (0, authentication_1.Auth)(enums_2.AuthType.Bearer, enums_2.AuthType.Permission),
    (0, swagger_1.ApiOperation)({ summary: 'Delete multiple document templates' }),
    (0, decorators_2.Permissions)(enums_1.EApiAppMode.ADMIN, enums_1.EPermissionActions.DELETE),
    (0, swagger_1.ApiResponse)({ type: document_1.DeleteMultipleDocumentsResponseDto }),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, decorators_2.ActiveUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.BaseParamDto,
        delete_multiple_document_templates_body_dto_1.DeleteMultipleDocumentTemplatesBodyDto, Object]),
    __metadata("design:returntype", Promise)
], DocumentTemplateController.prototype, "deleteMultipleDocumentTemplates", null);
__decorate([
    (0, common_1.Put)(':documentTemplateId/file'),
    (0, authentication_1.Auth)(enums_2.AuthType.Bearer, enums_2.AuthType.Permission),
    (0, decorators_2.Permissions)(enums_1.EApiAppMode.ADMIN, enums_1.EPermissionActions.EDIT),
    (0, decorators_1.FilesUpload)({
        singleUpload: true,
        multerOptions: {
            limits: { fileSize: 25 * enums_1.StorageUnitInByte.OneMb },
            fileFilter: (0, utils_1.filesSupportedFilter)(constants_1.DOCUMENTS_SUPPORT),
        },
        summary: 'Add a new file into document template.',
        additionBodyDto: document_1.UpdateNewDocumentFileBodyDto,
    }),
    (0, swagger_1.ApiResponse)({ type: document_template_response_dto_1.DocumentTemplateResponseDto }),
    __param(0, (0, common_1.Param)('companyId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('documentTemplateId', common_1.ParseIntPipe)),
    __param(2, (0, common_1.UploadedFile)('body')),
    __param(3, (0, common_1.UploadedFile)('file')),
    __param(4, (0, decorators_2.ActiveUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, document_1.UpdateNewDocumentFileBodyDto, Object, Object]),
    __metadata("design:returntype", Promise)
], DocumentTemplateController.prototype, "updateNewTemplateFile", null);
__decorate([
    (0, common_1.Put)(':documentTemplateId/file/:documentFileId/replace'),
    (0, authentication_1.Auth)(enums_2.AuthType.Bearer, enums_2.AuthType.Permission),
    (0, decorators_2.Permissions)(enums_1.EApiAppMode.ADMIN, enums_1.EPermissionActions.EDIT),
    (0, decorators_1.FilesUpload)({
        singleUpload: true,
        multerOptions: {
            limits: { fileSize: 25 * enums_1.StorageUnitInByte.OneMb },
            fileFilter: (0, utils_1.filesSupportedFilter)(constants_1.DOCUMENTS_SUPPORT),
        },
        summary: 'Replace existing document file.',
        additionBodyDto: replace_document_file_body_dto_1.ReplaceDocumentFileBodyDto,
    }),
    (0, swagger_1.ApiResponse)({ type: document_file_response_dto_1.DocumentFileResponseDto }),
    __param(0, (0, common_1.Param)('companyId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('documentFileId', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Param)('documentTemplateId', common_1.ParseIntPipe)),
    __param(3, (0, common_1.Body)()),
    __param(4, (0, common_1.UploadedFile)('file')),
    __param(5, (0, decorators_2.ActiveUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number, replace_document_file_body_dto_1.ReplaceDocumentFileBodyDto, Object, Object]),
    __metadata("design:returntype", Promise)
], DocumentTemplateController.prototype, "replaceDocumentFile", null);
__decorate([
    (0, common_1.Delete)(':documentTemplateId/file/:documentFileId'),
    (0, authentication_1.Auth)(enums_2.AuthType.Bearer, enums_2.AuthType.Permission),
    (0, swagger_1.ApiOperation)({ summary: 'Delete document file by documentTemplateId' }),
    (0, decorators_2.Permissions)(enums_1.EApiAppMode.ADMIN, enums_1.EPermissionActions.DELETE),
    __param(0, (0, common_1.Param)('companyId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('documentTemplateId', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Param)('documentFileId', common_1.ParseIntPipe)),
    __param(3, (0, decorators_2.ActiveUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number, Object]),
    __metadata("design:returntype", Promise)
], DocumentTemplateController.prototype, "deleteDocumentFile", null);
__decorate([
    (0, common_1.Post)(`:documentTemplateId/create-document`),
    (0, authentication_1.Auth)(enums_2.AuthType.Bearer, enums_2.AuthType.Permission),
    (0, decorators_2.Permissions)(enums_1.EApiAppMode.ADMIN, enums_1.EPermissionActions.CREATE),
    __param(0, (0, common_1.Param)('companyId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('documentTemplateId', common_1.ParseIntPipe)),
    __param(2, (0, decorators_2.ActiveUser)()),
    __param(3, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object, create_document_from_template_body_dto_1.CreateDocumentFromTemplateBodyDto]),
    __metadata("design:returntype", Promise)
], DocumentTemplateController.prototype, "createDocumentFromTemplate", null);
exports.DocumentTemplateController = DocumentTemplateController = __decorate([
    (0, decorators_2.ModuleMode)(enums_1.EApiModuleMode.ESign),
    (0, swagger_1.ApiTags)(constants_1.DOCUMENT_TEMPLATE_API_TAG_V1),
    (0, common_1.Controller)({ path: constants_1.DOCUMENT_TEMPLATE_API_PATH_V1 }),
    __metadata("design:paramtypes", [document_template_service_1.DocumentTemplateService])
], DocumentTemplateController);
//# sourceMappingURL=document-template.controller.js.map