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
exports.DocumentService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const class_validator_1 = require("class-validator");
const moment = require("moment");
const typeorm_2 = require("typeorm");
const utils_1 = require("../../../../../common/utils");
const entities_1 = require("../../../../../core/database/entities");
const services_1 = require("../../../../../core/database/services");
const utils_2 = require("../../../../../core/database/utils");
const dtos_1 = require("../../../dtos");
const enums_1 = require("../../../enums");
const zoho_1 = require("../../../libs/zoho");
const document_action_mapper_1 = require("../../../mappers/document-action.mapper");
const document_mapper_1 = require("../../../mappers/document.mapper");
const document_audit_1 = require("../../../modules/document-audit");
const document_action_service_1 = require("../../document-action/document-action.service");
const document_file_service_1 = require("../../document-file/services/document-file.service");
let DocumentService = class DocumentService extends services_1.TypeOrmBaseService {
    constructor(documentRepository, documentActionService, documentFileService, zohoService, documentAuditService) {
        super(documentRepository);
        this.documentRepository = documentRepository;
        this.documentActionService = documentActionService;
        this.documentFileService = documentFileService;
        this.zohoService = zohoService;
        this.documentAuditService = documentAuditService;
        this.currentDocumentFileBucket =
            this.documentFileService.currentAwsS3Bucket;
        this.currentDocumentFilePrefixKey =
            this.documentFileService.currentAwsS3PrefixKey;
    }
    async createDocument(createDocumentPayloadDto) {
        const { userEmail, companyId, file, name, isSequential } = createDocumentPayloadDto;
        const document = await this.create({
            ...createDocumentPayloadDto,
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
                documentId: document.id,
                userEmail,
            });
            Object.assign(document, { documentFiles });
            return new dtos_1.ESignBaseResponseDto({
                operationType: 'RequestDrafted',
                data: {
                    ...document,
                    documentId: document.id,
                    documentName: document.name,
                    documentStatus: document.status,
                    performedByEmail: userEmail,
                },
            });
        }
        catch (error) {
            await this.documentRepository
                .createQueryBuilder()
                .update(entities_1.DocumentEntity)
                .set({ isDeleted: true })
                .where(`id = :id`, { id: document.id })
                .execute();
            throw error;
        }
    }
    baseQueryBuilderGetDocument(companyId, opts = {}) {
        const { joinDocumentAction, joinDocumentFile, joinDocumentType, joinFolder, excludeDocumentFileFields, excludeDocumentActionFields, } = (0, utils_1.initPropsObject)(opts, {
            joinDocumentAction: true,
            joinDocumentFile: true,
            joinDocumentType: true,
            joinFolder: true,
            excludeDocumentFileFields: [],
            excludeDocumentActionFields: [],
        });
        const documentAlias = 'document';
        const folderAlias = 'folder';
        const documentTypeAlias = 'documentType';
        const documentActionAlias = 'documentActions';
        const documentFileAlias = 'documentFiles';
        const queryBuilder = this.documentRepository.createQueryBuilder(documentAlias);
        const documentWhereBracket = new utils_2.WhereConditionBuilder(documentAlias).andIsDeletedFalse();
        if (companyId) {
            documentWhereBracket.andWhere({
                field: 'companyId',
                operator: '=',
                value: companyId,
            });
        }
        queryBuilder.andWhere(documentWhereBracket.buildBracket());
        const documentColumnNames = (0, utils_2.getColumnNamesEntity)(entities_1.DocumentEntity.prototype, {
            withPrefix: documentAlias,
        });
        const selectFields = [
            `${documentAlias}.createdOn`,
            `${documentAlias}.updatedOn`,
            `${documentAlias}.createdBy`,
            ...documentColumnNames,
        ];
        if (joinDocumentFile) {
            const documentFileCondition = new utils_2.WhereConditionBuilder(documentFileAlias)
                .andWhereRaw(`${documentFileAlias}.documentId = ${documentAlias}.id`)
                .andIsDeletedFalse()
                .buildSql();
            queryBuilder.leftJoin(`${documentAlias}.documentFiles`, documentFileAlias, documentFileCondition.condition, documentFileCondition.parameters);
            const documentFileColumnNames = (0, utils_2.getColumnNamesEntity)(entities_1.DocumentFileEntity.prototype, {
                withPrefix: documentFileAlias,
                excludeColumns: excludeDocumentFileFields,
            });
            selectFields.push(...documentFileColumnNames);
            queryBuilder.addOrderBy(`${documentFileAlias}.order`);
        }
        if (joinDocumentAction) {
            const documentActionCondition = new utils_2.WhereConditionBuilder(documentActionAlias)
                .andWhereRaw(`${documentActionAlias}.documentId = ${documentAlias}.id`)
                .andIsDeletedFalse()
                .buildSql();
            queryBuilder.leftJoin(`${documentAlias}.documentActions`, documentActionAlias, documentActionCondition.condition, documentActionCondition.parameters);
            const documentActionColumnNames = (0, utils_2.getColumnNamesEntity)(entities_1.DocumentActionEntity.prototype, {
                withPrefix: documentActionAlias,
                excludeColumns: excludeDocumentActionFields,
            });
            selectFields.push(...documentActionColumnNames);
            queryBuilder.addOrderBy(`${documentActionAlias}.recipientIndex`);
        }
        if (joinFolder) {
            const folderJoinCondition = new utils_2.WhereConditionBuilder(folderAlias)
                .andWhereRaw(`${folderAlias}.id = ${documentAlias}.folderId`)
                .andIsDeletedFalse()
                .buildSql();
            queryBuilder.leftJoin(`${documentAlias}.folder`, folderAlias, folderJoinCondition.condition, folderJoinCondition.parameters);
            const folderColumnNames = (0, utils_2.getColumnNamesEntity)(entities_1.FolderEntity.prototype, {
                withPrefix: folderAlias,
            });
            selectFields.push(...folderColumnNames);
        }
        if (joinDocumentType) {
            const documentTypeJoinCondition = new utils_2.WhereConditionBuilder(documentTypeAlias)
                .andWhereRaw(`${documentTypeAlias}.id = ${documentAlias}.documentTypeId`)
                .andIsDeletedFalse()
                .buildSql();
            queryBuilder.leftJoin(`${documentAlias}.documentType`, documentTypeAlias, documentTypeJoinCondition.condition, documentTypeJoinCondition.parameters);
            const documentTypeColumnNames = (0, utils_2.getColumnNamesEntity)(entities_1.DocumentTypeEntity.prototype, { withPrefix: documentTypeAlias });
            selectFields.push(...documentTypeColumnNames);
        }
        queryBuilder.select(selectFields);
        return {
            queryBuilder,
            documentAlias,
            folderAlias,
            documentTypeAlias,
            documentActionAlias,
            documentFileAlias,
        };
    }
    async getAllDocuments(paginationQueryDto) {
        const { companyId, queryOwner, queryDocumentTypeName, queryFolderName, queryRecipients, filterStatus, } = paginationQueryDto;
        const { queryBuilder, documentAlias, documentActionAlias, documentTypeAlias, folderAlias, } = this.baseQueryBuilderGetDocument(companyId, {
            excludeDocumentFileFields: ['imageString'],
        });
        if (queryOwner) {
            queryBuilder.andWhere(`${documentAlias}.owner LIKE :queryOwner`, {
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
        if (queryRecipients) {
            queryBuilder.andWhere(`${documentActionAlias}.recipientEmail LIKE :queryRecipients`, { queryRecipients: `%${queryRecipients}%` });
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
    async getDocumentById(getDocumentByIdPayloadDto, opts = {}) {
        const { companyId, documentId, requestId } = getDocumentByIdPayloadDto;
        opts = (0, utils_1.initPropsObject)(opts, {
            joinDocumentAction: true,
            joinDocumentFile: true,
            calculateSignPercentage: true,
        });
        const { queryBuilder, documentAlias } = this.baseQueryBuilderGetDocument(companyId, opts);
        const documentWhereConditionBuilder = new utils_2.WhereConditionBuilder(documentAlias);
        if (requestId) {
            documentWhereConditionBuilder.andWhere({
                field: 'requestId',
                operator: '=',
                value: requestId,
            });
        }
        else {
            documentWhereConditionBuilder.andWhere({
                field: 'id',
                operator: '=',
                value: documentId,
            });
        }
        queryBuilder.andWhere(documentWhereConditionBuilder.buildBracket());
        const document = await queryBuilder.getOne();
        if (!document) {
            throw new common_1.NotFoundException(`Not found document. #${documentId}`);
        }
        if (opts.joinDocumentAction && opts.calculateSignPercentage) {
            Object.assign(document, {
                signPercentage: this.documentActionService.calculateSignPercentage(document.status, document.documentActions),
            });
        }
        return document;
    }
    async updateNewDocumentFile(updateNewDocumentFilePayloadDto) {
        const { userEmail, companyId, filesDto, documentId } = updateNewDocumentFilePayloadDto;
        const document = await this.getOneOrFail({
            where: { id: documentId, isDeleted: false, companyId },
            select: { id: true, name: true, status: true },
        });
        if (document.status !== enums_1.DocumentStatus.Draft) {
            throw new common_1.BadRequestException(`The document is not in Draft status.`);
        }
        await this.documentFileService.createDocumentFile({
            filesDto: filesDto,
            companyId,
            documentId: documentId,
            userEmail,
        });
        const newDoc = await this.getDocumentById({ documentId, companyId });
        return new dtos_1.ESignBaseResponseDto({
            operationType: 'RequestUpdated',
            data: {
                ...newDoc,
                documentId: newDoc.id,
                documentName: newDoc.name,
                documentStatus: newDoc.status,
                performedByEmail: userEmail,
            },
        });
    }
    async updateDocumentSetting(payload) {
        const { userEmail, companyId, documentId, documentFileSettings, documentActionSettings, deletedActions, ...settingPayload } = payload;
        const document = await this.getDocumentById({ companyId, documentId });
        const { documentFiles, documentActions } = document;
        const [actionUpdateResult] = await Promise.all([
            (documentActionSettings?.length || deletedActions?.length) &&
                this.documentActionService.updateDocumentActionSettings({
                    documentActions,
                    userEmail,
                    payload: documentActionSettings,
                    deletedActions,
                    companyId,
                    documentId,
                    actCommandQuery: true,
                }),
            documentFileSettings?.length &&
                this.documentFileService.updateDocumentFileSettings(documentFiles, userEmail, documentFileSettings),
        ]);
        if (actionUpdateResult) {
            Object.assign(settingPayload, { isBulk: actionUpdateResult.isBulk });
        }
        if ((0, class_validator_1.isNotEmptyObject)(settingPayload)) {
            await this.update(documentId, settingPayload, {
                userEmail,
                companyId,
                existingEntity: document,
            });
        }
        const newDoc = await this.getDocumentById({ documentId, companyId });
        return new dtos_1.ESignBaseResponseDto({
            operationType: 'RequestUpdated',
            data: {
                ...newDoc,
                documentId,
                documentName: newDoc.name,
                documentStatus: newDoc.status,
                performedByEmail: userEmail,
            },
        });
    }
    async updateDocumentStatusFromZohoWebhook(operationType, status, document, performedByEmail, currentDate, reason) {
        if (!Object.values(enums_1.DocumentStatus).includes(status)) {
            return `Skip update document status because the status is ${status}`;
        }
        if (document.status === status) {
            return `Skip update document status because document.status === status`;
        }
        const updateDto = {
            id: document.id,
            status,
            updatedBy: performedByEmail,
            updatedOn: currentDate,
        };
        switch (operationType) {
            case enums_1.DocumentOperationType.RequestCompleted:
                updateDto.completedOn = currentDate;
                break;
            case enums_1.DocumentOperationType.RequestExpired:
                updateDto.expiredOn = currentDate;
                break;
            case enums_1.DocumentOperationType.RequestRecalled:
                updateDto.recalledOn = currentDate;
                updateDto.recalledReason = reason || '';
                break;
            case enums_1.DocumentOperationType.RequestRejected:
                updateDto.declinedOn = currentDate;
                updateDto.declinedReason = reason || '';
                break;
            default:
                break;
        }
        return this.documentRepository.save(updateDto);
    }
    async submitDocumentToZoho({ documentId, companyId, userEmail }, documentEntity) {
        const document = documentEntity
            ? documentEntity
            : await this.getDocumentById({ documentId, companyId }, {
                joinFolder: false,
                joinDocumentType: false,
                excludeDocumentFileFields: ['imageString'],
                calculateSignPercentage: false,
            });
        const { documentActions, documentFiles } = document;
        for (let i = 0; i < documentActions.length; i++) {
            const action = documentActions[i];
            if (i === 0 && action.type === enums_1.DocumentActionType.View) {
                throw new common_1.BadRequestException(`Please ensure that the first recipient is a signer`);
            }
            if ((action.type === enums_1.DocumentActionType.Sign ||
                action.type === enums_1.DocumentActionType.InPerson) &&
                !action.fields?.length) {
                throw new common_1.BadRequestException(`[${i}] - Missing fields in recipient #${action.recipientName} - ${action.recipientEmail}.`);
            }
        }
        const zohoRequestDto = document_mapper_1.DocumentMapper.toZohoRequest(document);
        const { documentFileImages, fileMetaData } = await this.documentFileService.getDocumentFileImages(documentFiles, companyId, document.id);
        const zohoCreateDocumentResponse = await this.zohoService.createDocument({
            files: documentFileImages,
            requests: zohoRequestDto,
            documentId,
            companyId,
            fileMetaData,
        });
        const { requests } = zohoCreateDocumentResponse;
        const { request_id, document_ids, request_name, is_sequential } = requests;
        const documentFileZohoIdTable = fileMetaData.reduce((table, documentFile, index) => {
            Object.assign(table, {
                [documentFile.id]: document_ids[index].document_id,
            });
            return table;
        }, {});
        const { submitZohoRequestActionsDto, updateZohoActionsDto } = document_action_mapper_1.DocumentActionMapper.toZohoRequestActionSubmit(document.documentActions, zohoCreateDocumentResponse, documentFileZohoIdTable, userEmail);
        const submitZohoRequestBodyDto = {
            request_name,
            is_sequential,
            actions: submitZohoRequestActionsDto,
        };
        const zohoResponse = await this.zohoService.submitDocument(request_id, submitZohoRequestBodyDto);
        const { status } = zohoResponse;
        if (!status || (status && status !== 'success')) {
            throw new common_1.BadRequestException('Failed to send request to Zoho');
        }
        const [newDoc] = await Promise.all([
            this.update(documentId, {
                requestId: request_id,
                status: enums_1.DocumentStatus.InProgress,
                signSubmittedTime: moment.utc().toDate(),
            }, { userEmail, existingEntity: document }),
            this.documentActionService.updateZohoDocumentActionIds(updateZohoActionsDto),
        ]);
        return new dtos_1.ESignBaseResponseDto({
            operationType: 'RequestSubmitted',
            data: {
                ...newDoc,
                documentId,
                documentName: newDoc.name,
                documentStatus: newDoc.status,
                performedByEmail: userEmail,
            },
        });
    }
    async deleteMultipleDocuments(deleteMultipleDocumentsPayloadDto) {
        const { userEmail, documentIds } = deleteMultipleDocumentsPayloadDto;
        const documentAlias = 'document';
        const documents = await this.documentRepository
            .createQueryBuilder(`${documentAlias}`)
            .select(`${documentAlias}.id`)
            .addSelect(`${documentAlias}.status`)
            .addSelect(`${documentAlias}.requestId`)
            .where(`${documentAlias}.id IN (:...documentIds)`, { documentIds })
            .andWhere(`${documentAlias}.isDeleted = :isDeleted`, { isDeleted: false })
            .getMany();
        const defaultDeleteResult = { message: `Documents deleted successfully` };
        if (!documents.length)
            return defaultDeleteResult;
        const existingDocumentIds = documents.map(({ id }) => id);
        const commonDeleteFields = {
            isDeleted: true,
            updatedBy: userEmail,
            updatedOn: moment.utc().toDate(),
        };
        try {
            await this.documentRepository
                .createQueryBuilder()
                .update(entities_1.DocumentEntity)
                .set(commonDeleteFields)
                .whereInIds(existingDocumentIds)
                .execute();
            await Promise.all([
                this.documentFileService.repository
                    .createQueryBuilder()
                    .update(entities_1.DocumentFileEntity)
                    .set(commonDeleteFields)
                    .where(`documentId IN (:...ids)`, {
                    ids: existingDocumentIds,
                })
                    .execute(),
                this.documentActionService.repository
                    .createQueryBuilder()
                    .update(entities_1.DocumentActionEntity)
                    .set(commonDeleteFields)
                    .where(`documentId IN (:...ids)`, {
                    ids: existingDocumentIds,
                })
                    .execute(),
                this.documentAuditService.repository
                    .createQueryBuilder()
                    .update(entities_1.DocumentAuditEntity)
                    .set(commonDeleteFields)
                    .where(`documentId IN (:...ids)`, {
                    ids: existingDocumentIds,
                })
                    .execute(),
            ]);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Fail to delete multiple documents');
        }
        try {
            const recalledDocumentPromises = [];
            for (const document of documents) {
                const { status, requestId } = document;
                if (requestId && status === enums_1.DocumentStatus.InProgress) {
                    recalledDocumentPromises.push(this.zohoService.recallDocument(requestId));
                }
            }
            await Promise.all(recalledDocumentPromises);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error.message);
        }
        finally {
        }
        return defaultDeleteResult;
    }
    async downloadDocuments(payload, existingEntity) {
        const { companyId, documentId, downloadType, userEmail } = payload;
        const document = existingEntity
            ? existingEntity
            : await this.getDocumentById({ companyId, documentId }, {
                joinFolder: false,
                joinDocumentType: false,
                joinDocumentAction: false,
                joinDocumentFile: true,
                excludeDocumentFileFields: ['imageString'],
                calculateSignPercentage: false,
            });
        const { documentFiles, status, name } = document;
        if ((downloadType === enums_1.DownloadFileType.Cert ||
            downloadType === enums_1.DownloadFileType.FilesAndCertInPdf ||
            downloadType === enums_1.DownloadFileType.FilesAndCertInZip) &&
            status !== enums_1.DocumentStatus.Completed) {
            throw new common_1.BadRequestException(`The document ${name} is not completed`);
        }
        const resultDownloadFile = await this.documentFileService.downloadDocumentFilesZip(document, documentFiles, downloadType);
        const baseResponse = new dtos_1.ESignBaseResponseDto({
            operationType: 'RequestDownloaded',
            data: {
                ...resultDownloadFile,
                companyId,
                documentId,
                documentName: name,
                documentStatus: status,
                performedByEmail: userEmail,
            },
        });
        await this.documentAuditService.createDocumentAudit({
            activity: baseResponse.activity,
            companyId,
            documentId,
            documentStatus: baseResponse.documentStatus,
            operationType: baseResponse.operationType,
            userEmail: baseResponse.performedByEmail,
            documentName: baseResponse.documentName,
        });
        return baseResponse;
    }
    async recallDocument(payload) {
        const document = await this.getDocumentById(payload, {
            joinFolder: false,
            joinDocumentType: false,
            joinDocumentAction: false,
            joinDocumentFile: false,
            calculateSignPercentage: false,
        });
        if (document.status !== enums_1.DocumentStatus.InProgress) {
            throw new common_1.BadRequestException(`The document #${document.id} is not in process status`);
        }
        if (!document.requestId) {
            throw new common_1.InternalServerErrorException(`The document #${document.id} is lost requestId`);
        }
        const { companyId, documentId, userEmail } = payload;
        const zohoResponse = await this.zohoService.recallDocument(document.requestId);
        const newDoc = await this.update(documentId, {
            status: enums_1.DocumentStatus.Recalled,
            recalledReason: payload?.reason || '',
            recalledOn: moment.utc().toDate(),
        }, { userEmail, existingEntity: document, companyId });
        return new dtos_1.ESignBaseResponseDto({
            operationType: 'RequestRecalled',
            data: {
                ...zohoResponse,
                companyId,
                documentId: newDoc.id,
                documentName: newDoc.name,
                documentStatus: newDoc.status,
                performedByEmail: userEmail,
            },
        });
    }
    async remindRecipients(payload) {
        const document = await this.getDocumentById(payload, {
            joinFolder: false,
            joinDocumentType: false,
            joinDocumentAction: false,
            joinDocumentFile: false,
            calculateSignPercentage: false,
        });
        if (document.status !== enums_1.DocumentStatus.InProgress) {
            throw new common_1.BadRequestException(`The document #${document.id} is not in process status`);
        }
        if (!document.requestId) {
            throw new common_1.InternalServerErrorException(`The document #${document.id} is lost requestId`);
        }
        const zohoResponse = await this.zohoService.remindRecipients(document.requestId);
        return new dtos_1.ESignBaseResponseDto({
            operationType: 'RequestRemind',
            data: {
                ...zohoResponse,
                companyId: document.companyId,
                documentId: document.id,
                documentStatus: document.status,
                documentName: document.name,
                performedByEmail: payload.userEmail,
            },
        });
    }
    async extendDocument(payload) {
        const document = await this.getDocumentById(payload, {
            joinFolder: false,
            joinDocumentType: false,
            joinDocumentAction: false,
            joinDocumentFile: false,
        });
        if (document.status !== enums_1.DocumentStatus.InProgress &&
            document.status !== enums_1.DocumentStatus.Expired) {
            throw new common_1.BadRequestException(`The document #${document.id} is not in process or expired status`);
        }
        if (!document.requestId) {
            throw new common_1.InternalServerErrorException(`The document #${document.id} is lost requestId`);
        }
        const { companyId, documentId, userEmail, extendedDate } = payload;
        const result = await this.zohoService.extendDocument(document.requestId, extendedDate);
        const newDoc = await this.update(documentId, { extendedDate }, { userEmail, existingEntity: document, companyId });
        return new dtos_1.ESignBaseResponseDto({
            operationType: 'RequestExtended',
            data: {
                ...result,
                companyId,
                documentId,
                documentName: newDoc.name,
                documentStatus: newDoc.status,
                performedByEmail: userEmail,
            },
        });
    }
    async getDocumentAsNew(payload) {
        const document = await this.getDocumentById(payload, {
            joinDocumentFile: false,
        });
        const { documentActions, folder, documentType } = document;
        const copiedDocument = {
            companyId: document.id,
            name: document.name,
            status: document.status,
            isSequential: document.isSequential,
            expirationDays: document.expirationDays,
            validity: document.validity,
            description: document.description,
            emailReminders: document.emailReminders,
            reminderPeriod: document.reminderPeriod,
            notes: document.notes,
            folderId: document.folderId,
            documentTypeId: document.documentTypeId,
        };
        const baseEntityFieldsMap = new Map();
        baseEntityFieldsMap.set('id', true);
        baseEntityFieldsMap.set('createdBy', true);
        baseEntityFieldsMap.set('createdOn', true);
        baseEntityFieldsMap.set('updatedBy', true);
        baseEntityFieldsMap.set('updatedOn', true);
        baseEntityFieldsMap.set('isDeleted', true);
        const copiedDocumentAction = documentActions.map(action => {
            const copiedAction = structuredClone(action);
            delete copiedAction.id;
            delete copiedAction.documentId;
            delete copiedAction.createdBy;
            delete copiedAction.createdOn;
            delete copiedAction.updatedBy;
            delete copiedAction.updatedOn;
            delete copiedAction.isDeleted;
            return copiedAction;
        });
        Object.assign(copiedDocument, { documentActions: copiedDocumentAction });
        if (folder) {
            const copiedFolder = {};
            for (const [key, value] of Object.entries(folder)) {
                if (baseEntityFieldsMap.has(key))
                    continue;
                Object.assign(copiedFolder, { [key]: value });
            }
        }
        if (documentType) {
            const copiedDocumentType = {};
            for (const [key, value] of Object.entries(documentType)) {
                if (baseEntityFieldsMap.has(key))
                    continue;
                Object.assign(copiedDocumentType, { [key]: value });
            }
        }
        return copiedDocument;
    }
    async createFromTemplate(documentEntity, userEmail) {
        return this.create(documentEntity, { userEmail });
    }
};
exports.DocumentService = DocumentService;
exports.DocumentService = DocumentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.DocumentEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        document_action_service_1.DocumentActionService,
        document_file_service_1.DocumentFileService,
        zoho_1.ZohoService,
        document_audit_1.DocumentAuditService])
], DocumentService);
//# sourceMappingURL=document.service.js.map