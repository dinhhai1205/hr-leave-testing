import { UpdateCompanyDto } from './update-company.dto';
import { MulterFileUploadedDto } from '../../../../../common/dto';
export declare class UpdateCompanyPayloadDto {
    image: MulterFileUploadedDto;
    body: UpdateCompanyDto;
    userEmail: string;
    companyId: string;
}
