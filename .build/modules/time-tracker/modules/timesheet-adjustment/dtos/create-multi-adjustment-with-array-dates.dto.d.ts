import { AdjustmentStatus, TimeAdjustmentType, TimeSheetAdjustmentType } from '../../../../../core/database';
export declare class CreateMultiAdjustmentsWithArrayDatesDto {
    timeSheetType: TimeSheetAdjustmentType;
    status: AdjustmentStatus;
    payElementMappingId?: number;
    dates?: string;
    hour?: number;
    leaveId?: number;
    payrollIds: number[];
    workScheduleSetting?: string;
    adjustmentType: TimeAdjustmentType;
}
