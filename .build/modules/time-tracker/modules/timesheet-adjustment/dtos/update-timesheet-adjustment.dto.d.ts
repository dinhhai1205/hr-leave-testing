import { AdjustmentStatus, TimeAdjustmentType, TimeSheetAdjustmentType } from '../../../../../core/database';
export declare class UpdateTimeSheetAdjustmentDto {
    timeSheetType?: TimeSheetAdjustmentType;
    status?: AdjustmentStatus;
    payElementMappingId?: number;
    day?: number;
    daysToProrate: number;
    date?: string;
    hour?: number;
    leaveId?: number;
    payrollTimesheetId?: number;
    workScheduleSetting?: string;
    adjustmentType?: TimeAdjustmentType;
}
