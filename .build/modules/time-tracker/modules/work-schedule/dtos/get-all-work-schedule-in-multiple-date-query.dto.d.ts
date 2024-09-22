import { PaginationQueryDto } from '../../../../../common/dto';
export declare class GetAllWorkScheduleInMultipleDateQueryDto extends PaginationQueryDto {
    employeeIds?: number[];
    startDate?: string;
    endDate?: string;
}
