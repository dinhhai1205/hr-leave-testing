import { BaseParamDto } from '../../../../../common/dto';
export declare class CreateDocumentSharePayloadDto extends BaseParamDto {
    documentId: number;
    sharedWithEmail: string;
    sharedByUser?: string;
    notes?: string;
    userEmail?: string;
}
