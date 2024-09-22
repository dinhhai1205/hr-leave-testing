import { CreateCompanyDto } from './create-company.dto';
import { MulterFileUploadedDto } from '../../../../../common/dto';
export declare class CreateCompanyPayloadDto {
    image: MulterFileUploadedDto;
    body: CreateCompanyDto;
    userEmail: string;
    ownerId: string;
}
