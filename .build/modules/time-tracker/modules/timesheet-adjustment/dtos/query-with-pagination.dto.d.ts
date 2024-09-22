import { PaginationQueryDto } from '../../../../../common/dto';
import { TimeAdjustmentType } from '../../../../../core/database';
export declare class QueryWithPaginationDto extends PaginationQueryDto {
    adjustmentType?: TimeAdjustmentType;
    querySearchFields?: string[];
    filterUUID?: string;
}
