import { PaginationQueryDto } from '../../../../../common/dto';
import { PayCalculationMethod } from '../../../../../core/database';
export declare class QueryWithPaginationDto extends PaginationQueryDto {
    payrollCalculationMethod?: PayCalculationMethod;
    querySearchFields?: string[];
    filterUUID?: string;
}
