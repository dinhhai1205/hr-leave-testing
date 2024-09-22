import { MulterFileUploadedDto } from '../../../../../common/dto';
export declare class CreateCompanyDto {
    file: MulterFileUploadedDto;
    name: string;
    address: string;
    timeZone: string;
    country: string;
    isOwner: boolean;
}
