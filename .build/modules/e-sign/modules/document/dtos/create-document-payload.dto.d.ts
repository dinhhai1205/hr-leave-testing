import { BaseParamDto, MulterFileUploadedDto } from '../../../../../common/dto';
export declare class CreateDocumentPayloadDto extends BaseParamDto {
    file: MulterFileUploadedDto;
    name: string;
    userEmail: string;
    isSequential: boolean;
}
