import { CreateProjectBodyDto } from './create-project-body.dto';
import { MulterFileUploadedDto } from '../../../../../common/dto';
export declare class CreateProjectPayloadDto extends CreateProjectBodyDto {
    image: MulterFileUploadedDto;
    companyId: string;
    userEmail: string;
}
