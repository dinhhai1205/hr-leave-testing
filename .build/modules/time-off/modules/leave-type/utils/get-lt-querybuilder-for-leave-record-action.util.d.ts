import type { SelectQueryBuilder } from 'typeorm';
import type { LeaveTypeEntity } from '../../../../../core/database';
export declare function buildQueryBuilderForActionLeaveRecord(params: {
    ltQueryBuilder: SelectQueryBuilder<LeaveTypeEntity>;
    ltId: number;
}): SelectQueryBuilder<LeaveTypeEntity>;
