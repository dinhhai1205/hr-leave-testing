import { DeleteMultipleDocumentsBodyDto } from './delete-multiple-documents-body.dto';
export declare class DeleteMultipleDocumentsPayloadDto extends DeleteMultipleDocumentsBodyDto {
    userEmail: string;
    companyId: number;
    reason: string;
}
