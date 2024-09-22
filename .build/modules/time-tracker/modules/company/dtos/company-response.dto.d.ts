import { BaseEntityResponseDto } from '../../../../../common/dto';
import { WorkScheduleDefaultResponseDto } from './work-schedule-default-response.dto';
export declare class CompanyResponseDto extends BaseEntityResponseDto {
    name: string;
    logo: string;
    address: string;
    timeZone: string;
    country: string;
    ownerId: string;
    workScheduleDefault: WorkScheduleDefaultResponseDto;
}
