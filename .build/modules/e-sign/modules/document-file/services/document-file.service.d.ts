import { Repository } from 'typeorm';
import { DocumentFileEntity } from '../../../../../core/database/entities/document-file.entity';
import { DocumentEntity } from '../../../../../core/database/entities/document.entity';
import { TypeOrmBaseService, UpdateEntityOpts } from '../../../../../core/database/services';
import { AwsS3Service } from '../../../../../libs/aws';
import { DocumentBaseResponse, ESignBaseResponseDto } from '../../../dtos';
import { DocumentOperationType, DownloadFileType } from '../../../enums';
import { DocxToPdfService } from '../../../libs/docx-to-pdf';
import { ImageTransformService } from '../../../libs/image-transform';
import { PdfService } from '../../../libs/pdf';
import { PdfToImageService } from '../../../libs/pdf-to-image';
import { ZipService } from '../../../libs/zip';
import { ZohoService, ZohoWebHooKFilePayload } from '../../../libs/zoho';
import { CreateDocumentFilePayloadDto } from '../../../modules/document-file/dtos/create-document-file-payload.dto';
import { GetDocumentFileContentPayloadDto } from '../../../modules/document-file/dtos/get-document-file-content-payload.dto';
import { GetDocumentFileResponseDto } from '../../../modules/document-file/dtos/get-document-file-content-response.dto';
import { ReplaceDocumentFilePayloadDto } from '../../../modules/document-file/dtos/replace-document-file-payload.dto';
import { UpdateDocumentFileSettingDto } from '../../../modules/document-file/dtos/update-document-file-setting.dto';
import { DownloadDocumentsResponseDto } from '../../../modules/document/dtos';
export declare class DocumentFileService extends TypeOrmBaseService<DocumentFileEntity> {
    private readonly documentFileRepository;
    private readonly zipService;
    private readonly zohoService;
    private readonly imageTransformService;
    private readonly pdfToImageService;
    private readonly docxToPdfService;
    private readonly pdfService;
    private readonly awsS3Service;
    readonly currentAwsS3Bucket: string;
    readonly currentAwsS3PrefixKey: string;
    constructor(documentFileRepository: Repository<DocumentFileEntity>, zipService: ZipService, zohoService: ZohoService, imageTransformService: ImageTransformService, pdfToImageService: PdfToImageService, docxToPdfService: DocxToPdfService, pdfService: PdfService, awsS3Service: AwsS3Service);
    createDocumentFile(payload: {
        filesDto: Array<CreateDocumentFilePayloadDto>;
        companyId: number;
        documentId: number;
        userEmail: string;
        documentTemplateId?: number;
    }): Promise<DocumentFileEntity[]>;
    private createAndUploadDocumentFile;
    getDocumentFileExistTemplate(args: {
        documentFileId: number;
        companyId: number;
    }, opts?: Partial<{
        selectTemplate: boolean;
    }>): Promise<DocumentFileEntity>;
    private getDocumentFileJoinExistDocument;
    getDocumentFileContent(args: GetDocumentFileContentPayloadDto, documentFileOptional?: DocumentFileEntity): Promise<GetDocumentFileResponseDto>;
    replaceDocumentFile(payload: ReplaceDocumentFilePayloadDto, documentFileEntity?: DocumentFileEntity, throwErrorWhenDocumentIsNotDraft?: boolean): Promise<ESignBaseResponseDto<DocumentBaseResponse & DocumentFileEntity>>;
    deleteDocumentFile(args: {
        documentId: number;
        documentFileId: number;
        companyId: number;
    }, opts?: UpdateEntityOpts<DocumentFileEntity>, documentFileEntity?: DocumentFileEntity, throwErrorWhenDocumentIsNotDraft?: boolean): Promise<string>;
    private convertToImageString;
    private convertFileToPdf;
    private getImageStringAndConvertFileToPdf;
    updateDocumentFileOrder({ id, order, userEmail, }: {
        id: number;
        order: number;
        userEmail: string;
    }): Promise<DocumentFileEntity>;
    updateDocumentFileSettings(documentFiles: DocumentFileEntity[], userEmail: string, payload?: UpdateDocumentFileSettingDto[]): Promise<DocumentFileEntity[]>;
    deleteMultipleDocumentFile(userEmail: string, documentFiles?: DocumentFileEntity[]): Promise<string[] | undefined>;
    getDocumentFileImages(documentFiles: DocumentFileEntity[], companyId: number, documentId: number): Promise<{
        documentFileImages: Uint8Array[];
        fileMetaData: {
            id: number;
            name: string;
        }[];
    }>;
    private getDocumentFileImage;
    downloadCompletionCertificate(companyId: number, documentId: number, documentName: string): Promise<{
        buffer: Buffer;
        name: string;
    }>;
    downloadDocumentFiles(documentFiles: DocumentFileEntity[]): Promise<Buffer[]>;
    downloadDocumentDraftFileZip(companyId: number, documentId: number, documentFiles: DocumentFileEntity[]): Promise<DownloadDocumentsResponseDto>;
    downloadDocumentFilesZip(document: Pick<DocumentEntity, 'id' | 'name' | 'companyId'>, documentFiles: DocumentFileEntity[], downloadType?: DownloadFileType): Promise<DownloadDocumentsResponseDto>;
    updateDocumentFileFromZohoWebhook(companyId: number, documentId: number, requestId: string, zohoFile: ZohoWebHooKFilePayload): Promise<void>;
    updateCompletionCertificateFromZohoWebhook(companyId: number, documentId: number, requestId: string): Promise<void>;
    updateMultiDocumentFileFromZohoWebhook(companyId: number, documentId: number, requestId: string, zohoFilesPayload: ZohoWebHooKFilePayload[], operationType: DocumentOperationType): Promise<string>;
    copyTemplateFilesToDocumentFiles(copySourceKeys: string[], destinationKeys: string[], destinationBucket: string): Promise<import("@aws-sdk/client-s3").CopyObjectCommandOutput[]>;
}
