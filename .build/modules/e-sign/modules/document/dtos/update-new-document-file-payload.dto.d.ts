import { CreateDocumentFilePayloadDto } from '../../../modules/document-file/dtos/create-document-file-payload.dto';
import { BaseParamDto } from '../../../../../common/dto';
export declare class UpdateNewDocumentFilePayloadDto extends BaseParamDto {
    filesDto: CreateDocumentFilePayloadDto[];
    name: string;
    userEmail: string;
    documentId: number;
}
