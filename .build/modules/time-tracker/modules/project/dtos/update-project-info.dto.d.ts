import { MulterFileUploadedDto } from '../../../../../common/dto';
export declare class UpdateProjectInfoDto {
    name: string;
    code: string;
    file: MulterFileUploadedDto;
    description: string;
    active: boolean;
    clientId: string;
    locationId: string;
}
