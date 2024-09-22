import { MulterFileUploadedDto } from '../../../../../common/dto';
export declare class CreateDocumentFilePayloadDto extends MulterFileUploadedDto {
    name?: string;
    order: number;
}
