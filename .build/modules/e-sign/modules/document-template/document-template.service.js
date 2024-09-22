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
exports.DocumentTemplateService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const class_validator_1 = require("class-validator");
const moment = require("moment");
const typeorm_2 = require("typeorm");
const utils_1 = require("../../../../common/utils");
const entities_1 = require("../../../../core/database/entities");
const services_1 = require("../../../../core/database/services");
const utils_2 = require("../../../../core/database/utils");
const enums_1 = require("../../enums");
const mappers_1 = require("../../mappers");
const document_action_service_1 = require("../document-action/document-action.service");
const services_2 = require("../document-file/services");
const services_3 = require("../document/services");
let DocumentTemplateService = class DocumentTemplateService extends services_1.TypeOrmBaseService {
    constructor(documentTemplateRepository, documentService, documentFileService, documentActionService) {
        super(documentTemplateRepository);
        this.documentTemplateRepository = documentTemplateRepository;
        this.documentService = documentService;
        this.documentFileService = documentFileService;
        this.documentActionService = documentActionService;
        this.currDocFileBucket = this.documentService.currentDocumentFileBucket;
        this.currDocFilePrefixKey =
            this.documentService.currentDocumentFilePrefixKey;
        this.currTemplateFileBucket = this.documentFileService.currentAwsS3Bucket;
        this.currTemplateFilePrefixKey =
            this.documentFileService.currentAwsS3PrefixKey;
    }
    baseQueryBuilderGetDocumentTemplate(companyId, opts = {}) {
        const { joinDocumentAction, joinDocumentFile, joinDocumentType, joinFolder, excludeDocumentFileFields, } = (0, utils_1.initPropsObject)(opts, {
            joinDocumentAction: true,
            joinDocumentFile: true,
            joinDocumentType: true,
            joinFolder: true,
            excludeDocumentFileFields: [],
        });
        const documentTemplateAlias = 'documentTemplate';
        const folderAlias = 'folder';
        const documentTypeAlias = 'documentType';
        const documentFileAlias = 'documentFiles';
        const queryBuilder = this.documentTemplateRepository.createQueryBuilder(documentTemplateAlias);
        const documentWhereBracket = new utils_2.WhereConditionBuilder(documentTemplateAlias).andIsDeletedFalse();
        if (companyId) {
            documentWhereBracket.andWhere({
                field: 'companyId',
                operator: '=',
                value: companyId,
            });
        }
        queryBuilder.andWhere(documentWhereBracket.buildBracket());
        const documentTemplateColumnNames = (0, utils_2.getColumnNamesEntity)(entities_1.DocumentTemplateEntity.prototype, { withPrefix: documentTemplateAlias });
        const selectFields = [
            `${documentTemplateAlias}.createdOn`,
            `${documentTemplateAlias}.updatedOn`,
            `${documentTemplateAlias}.createdBy`,
            ...documentTemplateColumnNames,
        ];
        if (joinDocumentAction) {
            selectFields.push(`${documentTemplateAlias}.documentActions`);
        }
        if (joinDocumentFile) {
            const documentFileCondition = new utils_2.WhereConditionBuilder(documentFileAlias)
                .andWhereRaw(`${documentFileAlias}.documentTemplateId = ${documentTemplateAlias}.id`)
                .andIsDeletedFalse()
                .buildSql();
            queryBuilder.leftJoin(`${documentTemplateAlias}.documentFiles`, documentFileAlias, documentFileCondition.condition, documentFileCondition.parameters);
            const documentFileColumnNames = (0, utils_2.getColumnNamesEntity)(entities_1.DocumentFileEntity.prototype, {
                withPrefix: documentFileAlias,
                excludeColumns: excludeDocumentFileFields,
            });
            selectFields.push(...documentFileColumnNames);
            queryBuilder.addOrderBy(`${documentFileAlias}.order`);
        }
        if (joinFolder) {
            const folderJoinCondition = new utils_2.WhereConditionBuilder(folderAlias)
                .andWhereRaw(`${folderAlias}.id = ${documentTemplateAlias}.folderId`)
                .andIsDeletedFalse()
                .buildSql();
            queryBuilder.leftJoin(`${documentTemplateAlias}.folder`, folderAlias, folderJoinCondition.condition, folderJoinCondition.parameters);
            const folderColumnNames = (0, utils_2.getColumnNamesEntity)(entities_1.FolderEntity.prototype, {
                withPrefix: folderAlias,
            });
            selectFields.push(...folderColumnNames);
        }
        if (joinDocumentType) {
            const documentTypeJoinCondition = new utils_2.WhereConditionBuilder(documentTypeAlias)
                .andWhereRaw(`${documentTypeAlias}.id = ${documentTemplateAlias}.documentTypeId`)
                .andIsDeletedFalse()
                .buildSql();
            queryBuilder.leftJoin(`${documentTemplateAlias}.documentType`, documentTypeAlias, documentTypeJoinCondition.condition, documentTypeJoinCondition.parameters);
            const documentTypeColumnNames = (0, utils_2.getColumnNamesEntity)(entities_1.DocumentTypeEntity.prototype, { withPrefix: documentTypeAlias });
            selectFields.push(...documentTypeColumnNames);
        }
        queryBuilder.select(selectFields);
        return {
            queryBuilder,
            documentTemplateAlias,
            folderAlias,
            documentTypeAlias,
            documentFileAlias,
        };
    }
    async createDocumentTemplate(payload) {
        const { userEmail, companyId, file, name, isSequential } = payload;
        const documentTemplate = await this.create({
            ...payload,
            reminderPeriod: 5,
            expirationDays: 15,
            description: '',
            notes: '',
            validity: -1,
            isSequential,
            owner: userEmail,
        }, { userEmail });
        try {
            const documentFiles = await this.documentFileService.createDocumentFile({
                filesDto: [{ ...file, name, order: 1 }],
                companyId,
                documentId: 0,
                userEmail,
                documentTemplateId: documentTemplate.id,
            });
            Object.assign(documentTemplate, { documentFiles });
            return documentTemplate;
        }
        catch (error) {
            await this.documentTemplateRepository
                .createQueryBuilder()
                .update(entities_1.DocumentTemplateEntity)
                .set({ isDeleted: true })
                .where(`id = :id`, { id: documentTemplate.id })
                .execute();
            throw error;
        }
    }
    async getAllDocumentTemplates(paginationQueryDto) {
        const { companyId, queryOwner, queryFolderName, queryDocumentTypeName } = paginationQueryDto;
        const { queryBuilder, documentTemplateAlias, documentTypeAlias, folderAlias, } = this.baseQueryBuilderGetDocumentTemplate(companyId, {
            excludeDocumentFileFields: ['imageString'],
        });
        if (queryOwner) {
            queryBuilder.andWhere(`${documentTemplateAlias}.owner LIKE :queryOwner`, {
                queryOwner: `%${queryOwner}%`,
            });
        }
        if (queryFolderName) {
            queryBuilder.andWhere(`${folderAlias}.name LIKE :queryFolderName`, {
                queryFolderName: `%${queryFolderName}%`,
            });
        }
        if (queryDocumentTypeName) {
            queryBuilder.andWhere(`${documentTypeAlias}.name LIKE :queryDocumentTypeName`, { queryDocumentTypeName: `%${queryDocumentTypeName}%` });
        }
        return this.getEntitiesByQuery({
            queryBuilder,
            paginationQueryDto,
            querySearchFields: ['name'],
        });
    }
    async getDocumentTemplateById(payload, opts = {}) {
        const { companyId, documentTemplateId } = payload;
        opts = (0, utils_1.initPropsObject)(opts, {
            joinDocumentAction: true,
            joinDocumentFile: true,
        });
        const { queryBuilder, documentTemplateAlias } = this.baseQueryBuilderGetDocumentTemplate(companyId, opts);
        const documentTemplateWhereCondition = new utils_2.WhereConditionBuilder(documentTemplateAlias);
        documentTemplateWhereCondition.andWhere({
            field: 'id',
            operator: '=',
            value: documentTemplateId,
        });
        queryBuilder.andWhere(documentTemplateWhereCondition.buildBracket());
        const documentTemplate = await queryBuilder.getOne();
        if (!documentTemplate) {
            throw new common_1.NotFoundException(`Not found document template. #${documentTemplateId}`);
        }
        return documentTemplate;
    }
    async updateNewTemplateFile(payload) {
        const { companyId, documentTemplateId, filesDto, userEmail } = payload;
        await this.getOneOrFail({
            where: { id: documentTemplateId, isDeleted: false, companyId },
            select: { id: true, name: true },
        });
        await this.documentFileService.createDocumentFile({
            filesDto: filesDto,
            companyId,
            documentId: 0,
            documentTemplateId,
            userEmail,
        });
        const newDoc = await this.getDocumentTemplateById({
            documentTemplateId,
            companyId,
        });
        return newDoc;
    }
    async updateDocumentTemplateSetting(payload) {
        const { userEmail, companyId, documentTemplateId, documentFileSettings, documentActionSettings, deletedActions, ...settingPayload } = payload;
        const documentTemplate = await this.getDocumentTemplateById({
            companyId,
            documentTemplateId,
        });
        const { documentFiles, documentActions } = documentTemplate;
        const [actionUpdateResult] = await Promise.all([
            (documentActionSettings?.length || deletedActions?.length) &&
                this.documentActionService.updateDocumentActionSettings({
                    documentActions,
                    userEmail,
                    payload: documentActionSettings,
                    deletedActions,
                    companyId,
                    documentId: 0,
                }),
            documentFileSettings?.length &&
                this.documentFileService.updateDocumentFileSettings(documentFiles, userEmail, documentFileSettings),
        ]);
        if (actionUpdateResult) {
            const { entities, isBulk } = actionUpdateResult;
            if (entities.length) {
                const documentActionDtos = JSON.stringify(entities);
                Object.assign(settingPayload, { documentActions: documentActionDtos });
            }
            Object.assign(settingPayload, { isBulk });
        }
        if ((0, class_validator_1.isNotEmptyObject)(settingPayload)) {
            await this.update(documentTemplateId, settingPayload, {
                userEmail,
                companyId,
                existingEntity: documentTemplate,
            });
        }
        const newDoc = await this.getDocumentTemplateById({
            documentTemplateId,
            companyId,
        });
        return newDoc;
    }
    async deleteMultipleDocumentTemplates(payload) {
        const { userEmail, documentTemplateIds } = payload;
        const documentTemplateAlias = (0, utils_1.aliasEntity)(entities_1.DocumentTemplateEntity);
        const documentTemplates = await this.documentTemplateRepository
            .createQueryBuilder(documentTemplateAlias)
            .select(`${documentTemplateAlias}.id`)
            .where(`${documentTemplateAlias}.id IN (:...documentTemplateIds)`, {
            documentTemplateIds,
        })
            .andWhere(`${documentTemplateAlias}.isDeleted = :isDeleted`, {
            isDeleted: false,
        })
            .getMany();
        const defaultDeleteResult = {
            message: `Document templates deleted successfully`,
        };
        if (!documentTemplates.length)
            return defaultDeleteResult;
        const existingDocumentTemplateIds = documentTemplates.map(({ id }) => id);
        const commonDeleteFields = {
            isDeleted: true,
            updatedBy: userEmail,
            updatedOn: moment.utc().toDate(),
        };
        try {
            await this.documentTemplateRepository
                .createQueryBuilder()
                .update(entities_1.DocumentTemplateEntity)
                .set(commonDeleteFields)
                .whereInIds(existingDocumentTemplateIds)
                .execute();
            await this.documentFileService.repository
                .createQueryBuilder()
                .update(entities_1.DocumentFileEntity)
                .set(commonDeleteFields)
                .where(`documentTemplateId IN (:...ids)`, {
                ids: existingDocumentTemplateIds,
            })
                .execute();
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Fail to delete multiple document templates');
        }
        return defaultDeleteResult;
    }
    async getDocumentTemplateFileContent(payload) {
        const { companyId, documentFileId, documentTemplateId } = payload;
        const documentFile = await this.documentFileService.getDocumentFileExistTemplate({ companyId, documentFileId }, { selectTemplate: false });
        return this.documentFileService.getDocumentFileContent({
            companyId,
            documentId: documentTemplateId,
            documentFileId,
        }, documentFile);
    }
    async replaceDocumentTemplateFile(payload) {
        const { documentTemplateId, documentFileId, companyId } = payload;
        const documentFile = await this.documentFileService.getDocumentFileExistTemplate({ companyId, documentFileId }, { selectTemplate: false });
        Object.assign(documentFile, {
            document: { status: enums_1.DocumentStatus.InProgress },
        });
        const throwErrorWhenDocumentIsNotDraft = false;
        return this.documentFileService.replaceDocumentFile({ ...payload, documentId: documentTemplateId }, documentFile, throwErrorWhenDocumentIsNotDraft);
    }
    async deleteDocumentTemplateFile(payload) {
        const { documentTemplateId, documentFileId, companyId, userEmail } = payload;
        const documentFile = await this.documentFileService.getDocumentFileExistTemplate({ companyId, documentFileId }, { selectTemplate: false });
        Object.assign(documentFile, {
            document: { status: enums_1.DocumentStatus.InProgress },
        });
        const throwErrorWhenDocumentIsNotDraft = false;
        return this.documentFileService.deleteDocumentFile({ companyId, documentFileId, documentId: documentTemplateId }, { userEmail }, documentFile, throwErrorWhenDocumentIsNotDraft);
    }
    async createDocumentFromTemplate(payload) {
        const { companyId, documentTemplateId, userEmail, submitDocument = false, ...customTemplatePayload } = payload;
        const documentTemplateEntity = await this.getDocumentTemplateById({
            companyId,
            documentTemplateId,
        });
        const documentEntity = mappers_1.DocumentMapper.fromTemplate(userEmail, documentTemplateEntity, customTemplatePayload);
        const { document, documentActions, documentFiles } = await this.createDocumentAndCopyFileFromTemplate({
            companyId,
            userEmail,
            documentEntity,
            documentTemplateEntity,
        });
        Object.assign(document, { documentActions, documentFiles });
        if (submitDocument) {
            let emptyFieldAction = null;
            for (const action of document.documentActions) {
                if (!action.fields || !action?.fields?.length) {
                    emptyFieldAction = action;
                    break;
                }
            }
            if (emptyFieldAction) {
                throw new common_1.BadRequestException(`Field in action #${emptyFieldAction.recipientName}, index #${emptyFieldAction.recipientIndex}`);
            }
            await this.documentService.submitDocumentToZoho({ companyId, documentId: document.id, userEmail }, document);
        }
        return document;
    }
    async createDocumentAndCopyFileFromTemplate(args) {
        const { companyId, userEmail, documentEntity, documentTemplateEntity } = args;
        const commonRollBackFields = {
            isDeleted: true,
            updatedBy: userEmail,
            updatedOn: moment.utc().toDate(),
        };
        const document = await this.documentService.createFromTemplate(documentEntity, userEmail);
        try {
            const copySourceBucket = `/${this.currTemplateFileBucket}` +
                `/${this.currTemplateFilePrefixKey}`;
            const { fileDtos: documentFileEntities, copySourceKeys } = mappers_1.DocumentFileMapper.fromTemplate(document.id, userEmail, documentTemplateEntity, copySourceBucket);
            const templateFileMappingFileTable = {};
            const documentFiles = await this.documentFileService.repository.save(documentFileEntities);
            const destinationKeys = documentFiles.map((docFile, i) => {
                const commonResult = `${companyId}/${document.id}/${docFile.id}.pdf`;
                Object.assign(templateFileMappingFileTable, {
                    [`${documentTemplateEntity.documentFiles[i].id}`]: docFile.id,
                });
                if (this.currDocFilePrefixKey) {
                    return this.currDocFilePrefixKey + '/' + commonResult;
                }
                return commonResult;
            });
            const documentActionEntities = mappers_1.DocumentActionMapper.fromTemplate(document.id, userEmail, documentTemplateEntity, templateFileMappingFileTable);
            const documentActions = await this.documentActionService.repository.save(documentActionEntities);
            try {
                await this.documentFileService.copyTemplateFilesToDocumentFiles(copySourceKeys, destinationKeys, this.currDocFileBucket);
                return { document, documentActions, documentFiles };
            }
            catch (error) {
                await Promise.all([
                    this.documentFileService.repository
                        .createQueryBuilder()
                        .update(entities_1.DocumentFileEntity)
                        .set(commonRollBackFields)
                        .where(`documentId = :id`, { id: document.id })
                        .execute(),
                    this.documentActionService.repository
                        .createQueryBuilder()
                        .update(entities_1.DocumentActionEntity)
                        .set(commonRollBackFields)
                        .where(`documentId = :id`, { id: document.id })
                        .execute(),
                ]);
                throw error;
            }
        }
        catch (error) {
            await this.documentService.repository
                .createQueryBuilder()
                .update(entities_1.DocumentEntity)
                .set(commonRollBackFields)
                .where(`id = :id`, { id: document.id })
                .execute();
            throw error;
        }
    }
};
exports.DocumentTemplateService = DocumentTemplateService;
exports.DocumentTemplateService = DocumentTemplateService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.DocumentTemplateEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        services_3.DocumentService,
        services_2.DocumentFileService,
        document_action_service_1.DocumentActionService])
], DocumentTemplateService);
//# sourceMappingURL=document-template.service.js.map