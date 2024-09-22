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
exports.EssDocumentService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const constants_1 = require("../../../../../common/constants");
const document_action_entity_1 = require("../../../../../core/database/entities/document-action.entity");
const document_share_entity_1 = require("../../../../../core/database/entities/document-share.entity");
const document_entity_1 = require("../../../../../core/database/entities/document.entity");
const services_1 = require("../../../../../core/database/services");
const utils_1 = require("../../../../../core/database/utils");
const services_2 = require("../../../modules/document-file/services");
const document_service_1 = require("./document.service");
let EssDocumentService = class EssDocumentService extends services_1.TypeOrmBaseService {
    constructor(documentRepository, documentService, documentFileService) {
        super(documentRepository);
        this.documentRepository = documentRepository;
        this.documentService = documentService;
        this.documentFileService = documentFileService;
    }
    baseQueryBuilderGetEssDocument(companyId, userEmail, opts = {
        joinFolder: true,
        joinDocumentType: true,
        joinDocumentAction: true,
        joinDocumentFile: true,
    }) {
        const { queryBuilder, documentActionAlias, documentAlias, documentFileAlias, documentTypeAlias, folderAlias, } = this.documentService.baseQueryBuilderGetDocument(companyId, {
            ...opts,
            joinFolder: true,
            joinDocumentType: true,
            joinDocumentAction: false,
            joinDocumentFile: true,
        });
        const documentShareAlias = 'documentShares';
        const documentActionCondition = new utils_1.WhereConditionBuilder(documentActionAlias)
            .andWhereRaw(`${documentActionAlias}.documentId = ${documentAlias}.id`)
            .andIsDeletedFalse()
            .andWhere({ field: 'companyId', operator: '=', value: companyId })
            .andWhere({
            field: 'recipientEmail',
            operator: '=',
            value: userEmail,
            variable: 'userEmail',
        })
            .buildSql();
        queryBuilder.leftJoin(`${documentAlias}.documentActions`, documentActionAlias, documentActionCondition.condition, documentActionCondition.parameters);
        const documentActionColumnNames = (0, utils_1.getColumnNamesEntity)(document_action_entity_1.DocumentActionEntity.prototype, { withPrefix: documentActionAlias });
        queryBuilder.addSelect(documentActionColumnNames);
        const documentShareJoinCondition = new utils_1.WhereConditionBuilder(documentShareAlias)
            .andIsDeletedFalse()
            .andWhere({ field: 'companyId', operator: '=', value: companyId })
            .andWhereRaw(`${documentShareAlias}.documentId = ${documentAlias}.id`)
            .buildSql();
        queryBuilder.leftJoin(`${documentAlias}.documentShares`, documentShareAlias, documentShareJoinCondition.condition, documentShareJoinCondition.parameters);
        const documentShareColumnNames = (0, utils_1.getColumnNamesEntity)(document_share_entity_1.DocumentShareEntity.prototype, { withPrefix: documentShareAlias });
        queryBuilder.addSelect(documentShareColumnNames);
        queryBuilder.andWhere(`${documentActionAlias}.recipientEmail = :userEmail
       OR ${documentShareAlias}.sharedWithEmail = :userEmail`, { userEmail });
        return {
            queryBuilder,
            documentAlias,
            folderAlias,
            documentTypeAlias,
            documentActionAlias,
            documentFileAlias,
        };
    }
    async getAllEssDocuments(paginationQueryDto) {
        const { companyId, queryDocumentTypeName, queryFolderName, filterStatus, userEmail, } = paginationQueryDto;
        const { queryBuilder, documentAlias, documentTypeAlias, folderAlias } = this.baseQueryBuilderGetEssDocument(companyId, userEmail);
        if (queryFolderName) {
            queryBuilder.andWhere(`${folderAlias}.name LIKE :queryFolderName`, {
                queryFolderName: `%${queryFolderName}%`,
            });
        }
        if (queryDocumentTypeName) {
            queryBuilder.andWhere(`${documentTypeAlias}.name LIKE :queryDocumentTypeName`, { queryDocumentTypeName: `%${queryDocumentTypeName}%` });
        }
        if (filterStatus) {
            queryBuilder.andWhere(`${documentAlias}.status = :filterStatus`, {
                filterStatus,
            });
        }
        return this.getEntitiesByQuery({
            queryBuilder,
            paginationQueryDto,
            querySearchFields: ['name'],
        });
    }
    async getEssDocumentById(getEssDocumentByIdPayload) {
        const { companyId, documentId, userEmail } = getEssDocumentByIdPayload;
        const { queryBuilder, documentAlias } = this.baseQueryBuilderGetEssDocument(companyId, userEmail);
        const documentWhereConditionBuilder = new utils_1.WhereConditionBuilder(documentAlias);
        queryBuilder.andWhere(documentWhereConditionBuilder
            .andWhere({ field: 'id', operator: '=', value: documentId })
            .buildBracket());
        const document = await queryBuilder.getOne();
        if (!document) {
            throw new common_1.NotFoundException(`Not found document with id #${documentId}`);
        }
        return document;
    }
    async downloadEssDocuments(payload) {
        const { companyId, documentId, downloadType, userEmail } = payload;
        const document = await this.getEssDocumentById({
            companyId,
            documentId,
            userEmail,
        });
        return this.documentService.downloadDocuments({ companyId, documentId, downloadType }, document);
    }
    async getEssDocumentFileContent(payload) {
        const { companyId, documentFileId, documentId, userEmail } = payload;
        const document = await this.getEssDocumentById({
            companyId,
            documentId,
            userEmail,
        });
        const { documentFiles } = document;
        const documentFile = documentFiles.find(file => file.id === documentFileId);
        if (!documentFile) {
            throw new common_1.NotFoundException(`Not found file #${documentFileId}`);
        }
        const { name: fileName } = documentFile;
        const fileBuffers = await this.documentFileService.downloadDocumentFiles([
            documentFile,
        ]);
        if (!fileBuffers.length) {
            throw new common_1.NotFoundException(`File #${fileName} was not found`);
        }
        return {
            fileBuffer: fileBuffers[0],
            mineType: constants_1.CONTENT_TYPE.PDF,
            name: fileName,
            size: fileBuffers[0].byteLength,
        };
    }
};
exports.EssDocumentService = EssDocumentService;
exports.EssDocumentService = EssDocumentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(document_entity_1.DocumentEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        document_service_1.DocumentService,
        services_2.DocumentFileService])
], EssDocumentService);
//# sourceMappingURL=ess-document.service.js.map