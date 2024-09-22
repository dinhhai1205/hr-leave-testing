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
exports.DocumentFileService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const class_validator_1 = require("class-validator");
const moment = require("moment");
const typeorm_2 = require("typeorm");
const constants_1 = require("../../../../../common/constants");
const utils_1 = require("../../../../../common/utils");
const document_file_entity_1 = require("../../../../../core/database/entities/document-file.entity");
const document_template_entity_1 = require("../../../../../core/database/entities/document-template.entity");
const document_entity_1 = require("../../../../../core/database/entities/document.entity");
const services_1 = require("../../../../../core/database/services");
const utils_2 = require("../../../../../core/database/utils");
const aws_1 = require("../../../../../libs/aws");
const dtos_1 = require("../../../dtos");
const enums_1 = require("../../../enums");
const docx_to_pdf_1 = require("../../../libs/docx-to-pdf");
const image_transform_1 = require("../../../libs/image-transform");
const pdf_1 = require("../../../libs/pdf");
const pdf_to_image_1 = require("../../../libs/pdf-to-image");
const zip_1 = require("../../../libs/zip");
const zoho_1 = require("../../../libs/zoho");
const create_document_file_payload_dto_1 = require("../../../modules/document-file/dtos/create-document-file-payload.dto");
const replace_document_file_payload_dto_1 = require("../../../modules/document-file/dtos/replace-document-file-payload.dto");
let DocumentFileService = class DocumentFileService extends services_1.TypeOrmBaseService {
    constructor(documentFileRepository, zipService, zohoService, imageTransformService, pdfToImageService, docxToPdfService, pdfService, awsS3Service) {
        super(documentFileRepository);
        this.documentFileRepository = documentFileRepository;
        this.zipService = zipService;
        this.zohoService = zohoService;
        this.imageTransformService = imageTransformService;
        this.pdfToImageService = pdfToImageService;
        this.docxToPdfService = docxToPdfService;
        this.pdfService = pdfService;
        this.awsS3Service = awsS3Service;
        this.currentAwsS3Bucket = this.awsS3Service.bucketName;
        this.currentAwsS3PrefixKey = this.awsS3Service.prefixKey;
    }
    async createDocumentFile(payload) {
        const { filesDto, companyId, documentId, userEmail, documentTemplateId } = payload;
        const validateDtoPromises = [];
        const entities = [];
        const putS3Commands = [];
        const folderName = `${companyId}/${documentId || documentTemplateId}`;
        for (const fileDto of filesDto) {
            const { order, buffer, mimetype, originalname, size, name } = fileDto;
            const documentFileDto = new create_document_file_payload_dto_1.CreateDocumentFilePayloadDto();
            documentFileDto.buffer = buffer;
            documentFileDto.mimetype = mimetype;
            documentFileDto.originalname = originalname;
            documentFileDto.size = size;
            documentFileDto.order = order;
            validateDtoPromises.push((0, class_validator_1.validateOrReject)(documentFileDto));
            const documentFileEntity = new document_file_entity_1.DocumentFileEntity();
            documentFileEntity.companyId = companyId;
            documentFileEntity.documentId = documentId;
            documentFileEntity.name = name ? name : originalname;
            documentFileEntity.originalname = originalname;
            documentFileEntity.size = size || 0;
            documentFileEntity.order = order;
            documentFileEntity.documentTemplateId = documentTemplateId ?? 0;
            entities.push(documentFileEntity);
            putS3Commands.push({
                Key: folderName,
                Body: Buffer.from(buffer),
                ContentType: mimetype,
                ContentLength: size,
            });
        }
        await Promise.all(validateDtoPromises);
        const documentFiles = await Promise.all(entities.map((documentFileEntity, index) => this.createAndUploadDocumentFile({
            documentFileEntity,
            companyId,
            userEmail,
            putS3Command: putS3Commands[index],
        })));
        return documentFiles;
    }
    async createAndUploadDocumentFile(args) {
        const { documentFileEntity, userEmail, companyId, putS3Command } = args;
        const fileBuffer = putS3Command.Body;
        const fileMineType = putS3Command.ContentType;
        const { imageString, fileBufferConvertedPdf } = await this.getImageStringAndConvertFileToPdf(fileBuffer, fileMineType);
        const documentFile = await this.create({ ...documentFileEntity, imageString }, { userEmail, companyId });
        putS3Command.Key = putS3Command.Key + `/${documentFile.id}.pdf`;
        putS3Command.Body = fileBufferConvertedPdf;
        putS3Command.ContentType = constants_1.CONTENT_TYPE.PDF;
        putS3Command.ContentLength = fileBufferConvertedPdf.byteLength;
        try {
            await this.awsS3Service.putObjectToS3(putS3Command);
        }
        catch (error) {
            await this.documentFileRepository
                .createQueryBuilder()
                .update(document_file_entity_1.DocumentFileEntity)
                .set({ isDeleted: true })
                .where(`id = :id`, { id: documentFile.id })
                .execute();
            throw new common_1.InternalServerErrorException(`The file upload failed.`);
        }
        return documentFile;
    }
    async getDocumentFileExistTemplate(args, opts = {}) {
        opts = (0, utils_1.initPropsObject)(opts, { selectTemplate: true });
        const { documentFileId, companyId } = args;
        const documentFileAlias = (0, utils_1.aliasEntity)(document_file_entity_1.DocumentFileEntity);
        const templateAlias = (0, utils_1.aliasEntity)(document_template_entity_1.DocumentTemplateEntity);
        const queryBuilder = this.documentFileRepository.createQueryBuilder(documentFileAlias);
        queryBuilder.andWhere(new utils_2.WhereConditionBuilder(documentFileAlias)
            .andIsDeletedFalse()
            .andWhere({ field: 'companyId', operator: '=', value: companyId })
            .andWhere({ field: 'id', operator: '=', value: documentFileId })
            .buildBracket());
        const documentJoinCondition = new utils_2.WhereConditionBuilder(templateAlias)
            .andWhereRaw(`${documentFileAlias}.documentTemplateId = ${templateAlias}.id`)
            .andIsDeletedFalse()
            .andWhere({ field: 'companyId', operator: '=', value: companyId })
            .buildSql();
        queryBuilder.innerJoin(`${documentFileAlias}.documentTemplate`, templateAlias, documentJoinCondition.condition, documentJoinCondition.parameters);
        const documentFileColumnNames = (0, utils_2.getColumnNamesEntity)(document_file_entity_1.DocumentFileEntity.prototype, { withPrefix: documentFileAlias });
        queryBuilder.select(documentFileColumnNames);
        if (opts.selectTemplate) {
            const documentColumnNames = (0, utils_2.getColumnNamesEntity)(document_entity_1.DocumentEntity.prototype, { withPrefix: templateAlias });
            queryBuilder.addSelect(documentColumnNames);
        }
        const documentFile = await queryBuilder.getOne();
        if (!documentFile) {
            throw new common_1.NotFoundException(`Not found the document file #${documentFileId}`);
        }
        return documentFile;
    }
    async getDocumentFileJoinExistDocument(args, opts = {}) {
        opts = (0, utils_1.initPropsObject)(opts, { selectDocument: true });
        const { documentFileId, companyId } = args;
        const documentFileAlias = document_file_entity_1.DocumentFileEntity.name;
        const documentAlias = 'document';
        const queryBuilder = this.documentFileRepository.createQueryBuilder(documentFileAlias);
        queryBuilder.andWhere(new utils_2.WhereConditionBuilder(documentFileAlias)
            .andIsDeletedFalse()
            .andWhere({ field: 'companyId', operator: '=', value: companyId })
            .andWhere({ field: 'id', operator: '=', value: documentFileId })
            .buildBracket());
        const documentJoinCondition = new utils_2.WhereConditionBuilder(documentAlias)
            .andWhereRaw(`${documentFileAlias}.documentId = ${documentAlias}.id`)
            .andIsDeletedFalse()
            .andWhere({ field: 'companyId', operator: '=', value: companyId })
            .buildSql();
        queryBuilder.innerJoin(`${documentFileAlias}.document`, documentAlias, documentJoinCondition.condition, documentJoinCondition.parameters);
        const documentFileColumnNames = (0, utils_2.getColumnNamesEntity)(document_file_entity_1.DocumentFileEntity.prototype, { withPrefix: documentFileAlias });
        queryBuilder.select(documentFileColumnNames);
        if (opts.selectDocument) {
            const documentColumnNames = (0, utils_2.getColumnNamesEntity)(document_entity_1.DocumentEntity.prototype, { withPrefix: documentAlias });
            queryBuilder.addSelect(documentColumnNames);
        }
        const documentFile = await queryBuilder.getOne();
        if (!documentFile) {
            throw new common_1.NotFoundException(`Not found the document file #${documentFileId}`);
        }
        return documentFile;
    }
    async getDocumentFileContent(args, documentFileOptional) {
        const { documentFileId, documentId, companyId } = args;
        const documentFile = documentFileOptional
            ? documentFileOptional
            : await this.getDocumentFileJoinExistDocument(args, {
                selectDocument: false,
            });
        const { name: fileName } = documentFile;
        const awsResponse = await this.awsS3Service.getObjectResponse({
            Key: `${companyId}/${documentId}/${documentFileId}.pdf`,
        });
        const { Body, ContentLength, ContentType } = awsResponse;
        if (!Body) {
            throw new common_1.NotFoundException(`Not found file #$${documentFileId}`);
        }
        return {
            fileBuffer: Buffer.from(await Body.transformToByteArray()),
            mineType: ContentType || constants_1.CONTENT_TYPE.PDF,
            name: fileName,
            size: ContentLength || 0,
        };
    }
    async replaceDocumentFile(payload, documentFileEntity, throwErrorWhenDocumentIsNotDraft = true) {
        const { buffer, originalname, size, name, documentId, documentFileId, companyId, userEmail, } = payload;
        const mimetype = (payload.mimetype || constants_1.CONTENT_TYPE.BINARY);
        const documentFile = documentFileEntity
            ? documentFileEntity
            : await this.getDocumentFileJoinExistDocument({
                documentFileId,
                documentId,
                companyId,
            });
        const { name: documentName, status: documentStatus } = documentFile.document;
        if (throwErrorWhenDocumentIsNotDraft &&
            documentStatus !== enums_1.DocumentStatus.Draft) {
            throw new common_1.BadRequestException(`The document not in Draft status`);
        }
        const documentFileDto = new replace_document_file_payload_dto_1.ReplaceDocumentFilePayloadDto();
        documentFileDto.buffer = buffer;
        documentFileDto.mimetype = mimetype;
        documentFileDto.originalname = originalname;
        documentFileDto.size = size;
        documentFileDto.name = name ? name : originalname;
        const fileBuffer = Buffer.from(buffer);
        const { imageString, fileBufferConvertedPdf } = await this.getImageStringAndConvertFileToPdf(fileBuffer, mimetype);
        await this.awsS3Service.putObjectToS3({
            Key: `${companyId}/${documentId}/${documentFileId}.pdf`,
            Body: fileBufferConvertedPdf,
            ContentType: constants_1.CONTENT_TYPE.PDF,
            ContentLength: fileBufferConvertedPdf.byteLength,
        });
        const documentFileUpdated = await this.update(documentFileId, { ...documentFileDto, imageString }, { userEmail, existingEntity: documentFile });
        if (documentFileUpdated.buffer) {
            delete documentFileUpdated.buffer;
        }
        return new dtos_1.ESignBaseResponseDto({
            operationType: 'RequestUpdated',
            data: {
                ...documentFileUpdated,
                documentId,
                documentName,
                documentStatus,
                performedByEmail: userEmail,
            },
        });
    }
    async deleteDocumentFile(args, opts = {}, documentFileEntity, throwErrorWhenDocumentIsNotDraft = true) {
        const { documentFileId, documentId, companyId } = args;
        const documentFile = documentFileEntity
            ? documentFileEntity
            : await this.getDocumentFileJoinExistDocument(args);
        if (throwErrorWhenDocumentIsNotDraft &&
            documentFile.document.status !== enums_1.DocumentStatus.Draft) {
            throw new common_1.BadRequestException(`The document not in Draft status`);
        }
        await this.delete(documentFileId, {
            ...opts,
            existingEntity: documentFile,
        });
        await this.awsS3Service.deleteObjectsS3([
            `${companyId}/${documentId}/${documentFileId}.pdf`,
        ]);
        return '';
    }
    async convertToImageString(fileBuffer, imageType) {
        switch (imageType) {
            case constants_1.CONTENT_TYPE.JPEG:
            case constants_1.CONTENT_TYPE.JPG:
            case constants_1.CONTENT_TYPE.PNG:
                return this.imageTransformService.toBase64(fileBuffer);
            case constants_1.CONTENT_TYPE.PDF:
                return this.pdfToImageService.convertToBase64(fileBuffer);
            case constants_1.CONTENT_TYPE.DOC:
            case constants_1.CONTENT_TYPE.DOCX:
                return this.pdfToImageService.convertToBase64(fileBuffer);
            default:
                throw new common_1.BadRequestException(`File dose not supported. #${imageType}`);
        }
    }
    async convertFileToPdf(fileBuffer, imageType) {
        switch (imageType) {
            case constants_1.CONTENT_TYPE.JPEG:
            case constants_1.CONTENT_TYPE.JPG:
            case constants_1.CONTENT_TYPE.PNG:
                return this.imageTransformService.toPdf(fileBuffer);
            case constants_1.CONTENT_TYPE.DOC:
            case constants_1.CONTENT_TYPE.DOCX:
                return this.docxToPdfService.convert(fileBuffer);
            case constants_1.CONTENT_TYPE.PDF:
                return fileBuffer;
            default:
                throw new common_1.BadRequestException(`File dose not supported #${imageType}`);
        }
    }
    async getImageStringAndConvertFileToPdf(fileBuffer, imageType) {
        let imageString;
        let fileBufferConvertedPdf;
        switch (imageType) {
            case constants_1.CONTENT_TYPE.DOC:
            case constants_1.CONTENT_TYPE.DOCX:
                fileBufferConvertedPdf = await this.convertFileToPdf(fileBuffer, imageType);
                imageString = await this.convertToImageString(fileBufferConvertedPdf, constants_1.CONTENT_TYPE.PDF);
                break;
            default:
                [imageString, fileBufferConvertedPdf] = await Promise.all([
                    this.convertToImageString(fileBuffer, imageType),
                    this.convertFileToPdf(fileBuffer, imageType),
                ]);
                break;
        }
        return { imageString, fileBufferConvertedPdf };
    }
    async updateDocumentFileOrder({ id, order, userEmail, }) {
        return this.update(id, { order: order }, { userEmail });
    }
    async updateDocumentFileSettings(documentFiles, userEmail, payload) {
        if (!payload?.length)
            return documentFiles;
        const mapping = {};
        for (const documentFile of documentFiles) {
            mapping[documentFile.id] = documentFile;
        }
        const updateDocumentFileDto = [];
        for (const { id, name, order } of payload) {
            const existingDocumentFile = mapping[id];
            if (!existingDocumentFile) {
                throw new common_1.NotFoundException(`Not found document file with id #${id} to update`);
            }
            if (name === existingDocumentFile.name &&
                order === existingDocumentFile.order) {
                continue;
            }
            updateDocumentFileDto.push({
                id,
                name,
                order,
                updatedBy: userEmail,
                updatedOn: moment.utc().toDate(),
            });
        }
        return this.documentFileRepository.save(updateDocumentFileDto);
    }
    async deleteMultipleDocumentFile(userEmail, documentFiles) {
        if (!documentFiles?.length)
            return;
        return Promise.all(documentFiles.map(documentFile => {
            if (!documentFile) {
                throw new common_1.InternalServerErrorException('Not found document file to delete');
            }
            const { documentId, companyId, id: documentFileId } = documentFile;
            if (!documentId || !companyId || !documentFileId) {
                throw new common_1.InternalServerErrorException('Delete document file failed');
            }
            return this.deleteDocumentFile({ companyId, documentId, documentFileId }, { userEmail, existingEntity: documentFile });
        }));
    }
    async getDocumentFileImages(documentFiles, companyId, documentId) {
        const documentFilePromise = [];
        const fileMetaData = [];
        for (const documentFile of documentFiles) {
            documentFilePromise.push(this.getDocumentFileImage(documentId, companyId, documentFile.id));
            fileMetaData.push({
                id: documentFile.id,
                name: documentFile.name,
            });
        }
        const documentFileImages = await Promise.all(documentFilePromise);
        return {
            documentFileImages,
            fileMetaData,
        };
    }
    async getDocumentFileImage(documentId, companyId, documentFieldId) {
        const documentS3File = await this.awsS3Service.getObjectResponse({
            Key: `${companyId}/${documentId}/${documentFieldId}.pdf`,
        });
        const { Body } = documentS3File;
        if (!Body) {
            throw new Error(`Not found document file with id #${documentFieldId}`);
        }
        return Body.transformToByteArray();
    }
    async downloadCompletionCertificate(companyId, documentId, documentName) {
        return {
            buffer: (await this.awsS3Service.getObjectContent(`${companyId}/${documentId}/completioncertificate.pdf`)).buffer,
            name: `${documentName}_completioncertificate.pdf`,
        };
    }
    async downloadDocumentFiles(documentFiles) {
        const objectKeys = documentFiles.map(file => `${file.companyId}/${file.documentId}/${file.id}.pdf`);
        return (await this.awsS3Service.getObjectContents(objectKeys)).map(file => file.buffer);
    }
    async downloadDocumentDraftFileZip(companyId, documentId, documentFiles) {
        if (!documentFiles.length) {
            throw new common_1.BadRequestException('Document files is empty.');
        }
        if (documentFiles.length === 1) {
            const objectKey = `${companyId}/${documentId}/${documentFiles[0].id}.pdf`;
            return {
                isZip: false,
                buffer: (await this.awsS3Service.getObjectContent(objectKey)).buffer,
            };
        }
        const documentFileNames = [];
        const objectKeys = documentFiles.map(documentFile => {
            documentFileNames.push(documentFile.name);
            return `${companyId}/${documentId}/${documentFile.id}.pdf`;
        });
        const files = await this.awsS3Service.getObjectContents(objectKeys);
        const createZipInput = documentFileNames.map((name, index) => ({
            name,
            buffer: files[index].buffer,
        }));
        return {
            isZip: true,
            buffer: this.zipService.createZip(createZipInput),
        };
    }
    async downloadDocumentFilesZip(document, documentFiles, downloadType = enums_1.DownloadFileType.Files) {
        const { name: documentName } = document;
        if (!documentFiles.length) {
            throw new common_1.BadRequestException('Document files is empty.');
        }
        const { companyId, id: documentId } = document;
        const onlyOneDocumentFile = documentFiles.length === 1;
        const [fileBuffers, certificationFile] = await Promise.all([
            this.downloadDocumentFiles(documentFiles),
            downloadType === enums_1.DownloadFileType.Cert ||
                downloadType === enums_1.DownloadFileType.FilesAndCertInPdf ||
                downloadType === enums_1.DownloadFileType.FilesAndCertInZip
                ? this.downloadCompletionCertificate(companyId, documentId, documentName)
                : undefined,
        ]);
        if (downloadType === enums_1.DownloadFileType.Cert) {
            const { buffer } = certificationFile;
            return { isZip: false, buffer };
        }
        if (downloadType === enums_1.DownloadFileType.FilesAndCertInZip) {
            const documentFileList = fileBuffers.map((fileBuff, i) => ({
                name: `${documentFiles[i].name}.pdf`,
                buffer: fileBuff,
            }));
            const { buffer, name } = certificationFile;
            return {
                isZip: true,
                buffer: this.zipService.createZip([
                    ...documentFileList,
                    { name, buffer },
                ]),
            };
        }
        if (downloadType === enums_1.DownloadFileType.FilesAndCertInPdf) {
            const { buffer: certBuffer } = certificationFile;
            if (onlyOneDocumentFile) {
                return {
                    isZip: false,
                    buffer: await this.pdfService.mergePdfBuffers([
                        ...fileBuffers,
                        certBuffer,
                    ]),
                };
            }
            return {
                isZip: false,
                buffer: await this.pdfService.mergePdfBuffers([
                    ...fileBuffers,
                    certBuffer,
                ]),
            };
        }
        if (downloadType === enums_1.DownloadFileType.FilesInPdf) {
            if (onlyOneDocumentFile) {
                return {
                    isZip: false,
                    buffer: fileBuffers[0],
                };
            }
            return {
                isZip: false,
                buffer: await this.pdfService.mergePdfBuffers(fileBuffers),
            };
        }
        if (onlyOneDocumentFile) {
            return { isZip: false, buffer: fileBuffers[0] };
        }
        else {
            const documentFileList = fileBuffers.map((fileBuff, i) => ({
                name: `${documentFiles[i].name}.pdf`,
                buffer: fileBuff,
            }));
            return {
                isZip: true,
                buffer: this.zipService.createZip(documentFileList),
            };
        }
    }
    async updateDocumentFileFromZohoWebhook(companyId, documentId, requestId, zohoFile) {
        const { document_name: zohoFileName, document_id: zohoFileId } = zohoFile;
        const fileBuffer = await this.zohoService.downloadParticularDocumentFile(requestId, zohoFileId);
        if (!fileBuffer) {
            throw new common_1.NotFoundException(`Not found file download ${zohoFileName}`);
        }
        const namePattern = zohoFileName.split('_')[0];
        if (!namePattern) {
            throw new common_1.BadRequestException(`Invalid file name format ${zohoFileName}`);
        }
        const [, , fileId] = namePattern.split('-');
        await this.awsS3Service.putObjectToS3({
            Body: fileBuffer,
            Key: `${companyId}/${documentId}/${fileId}.pdf`,
        });
    }
    async updateCompletionCertificateFromZohoWebhook(companyId, documentId, requestId) {
        const completionCertificate = await this.zohoService.downloadCompletionCertificate(requestId);
        if (!completionCertificate) {
            throw new common_1.NotFoundException(`Not found completion certificate file`);
        }
        const objectKey = `${companyId}/${documentId}/completioncertificate.pdf`;
        await this.awsS3Service.putObjectToS3({
            Body: completionCertificate,
            Key: objectKey,
        });
    }
    async updateMultiDocumentFileFromZohoWebhook(companyId, documentId, requestId, zohoFilesPayload, operationType) {
        try {
            const updateDocumentFilePromises = zohoFilesPayload.map(zohoFile => this.updateDocumentFileFromZohoWebhook(companyId, documentId, requestId, zohoFile));
            if (operationType === enums_1.DocumentOperationType.RequestCompleted) {
                updateDocumentFilePromises.push(this.updateCompletionCertificateFromZohoWebhook(companyId, documentId, requestId));
            }
            await Promise.all(updateDocumentFilePromises);
            return 'Success sync file from zoho to S3';
        }
        catch (error) {
            return `Fail to sync file from zoho to S3. Reason ${error.message}`;
        }
    }
    async copyTemplateFilesToDocumentFiles(copySourceKeys, destinationKeys, destinationBucket) {
        const copyPromises = [];
        for (let i = 0; i < copySourceKeys.length; i++) {
            copyPromises.push(this.awsS3Service.copyObjectS3({
                Bucket: destinationBucket,
                CopySource: copySourceKeys[i],
                Key: destinationKeys[i],
            }));
        }
        return Promise.all(copyPromises);
    }
};
exports.DocumentFileService = DocumentFileService;
exports.DocumentFileService = DocumentFileService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(document_file_entity_1.DocumentFileEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        zip_1.ZipService,
        zoho_1.ZohoService,
        image_transform_1.ImageTransformService,
        pdf_to_image_1.PdfToImageService,
        docx_to_pdf_1.DocxToPdfService,
        pdf_1.PdfService,
        aws_1.AwsS3Service])
], DocumentFileService);
//# sourceMappingURL=document-file.service.js.map