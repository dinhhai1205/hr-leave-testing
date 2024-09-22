import { AdjustmentStatus, TimeAdjustmentType, TimeSheetAdjustmentType } from '../../../../../core/database';
export declare class CreateMultiTimeSheetAdjustmentDto {
    timeSheetType: TimeSheetAdjustmentType;
    status: AdjustmentStatus;
    payElementMappingId?: number;
    startDate?: string;
    endDate?: string;
    hour?: number;
    leaveId?: number;
    payrollIds: number[];
    workScheduleSetting?: string;
    adjustmentType: TimeAdjustmentType;
}
