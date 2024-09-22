import { BaseEntityResponseDto } from '../../../../../common/dto';
export declare class DocumentShareResponseDto extends BaseEntityResponseDto {
    documentId: number;
    companyId: number;
    sharedWithEmail: string;
    sharedByUser: string;
}
