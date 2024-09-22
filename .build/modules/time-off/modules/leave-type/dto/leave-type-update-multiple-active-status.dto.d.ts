import { LeaveTypeEntity } from '../../../../../core/database/entities/leave-type.entity';
export declare class LeaveTypeUpdateMultipleActiveStatusDto implements Partial<Pick<LeaveTypeEntity, 'active' | 'activeForEss'>> {
    ids?: number[];
    active?: boolean;
    activeForEss?: boolean;
}
