import { BaseParamDto } from '../../../../../common/dto';
import { CreateDocumentFilePayloadDto } from '../../document-file/dtos/create-document-file-payload.dto';
export declare class UpdateNewTemplateFilePayloadDto extends BaseParamDto {
    filesDto: CreateDocumentFilePayloadDto[];
    name: string;
    userEmail: string;
    documentTemplateId: number;
}
