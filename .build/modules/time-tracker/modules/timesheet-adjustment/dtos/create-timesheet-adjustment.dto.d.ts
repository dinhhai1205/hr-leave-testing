import { AdjustmentStatus, TimeAdjustmentType, TimeSheetAdjustmentType } from '../../../../../core/database';
export declare class CreateTimeSheetAdjustmentDto {
    timeSheetType: TimeSheetAdjustmentType;
    status: AdjustmentStatus;
    payElementMappingId?: number;
    startDate?: string;
    endDate?: string;
    hour?: number;
    day?: number;
    daysToProrate?: number;
    leaveId?: number;
    payrollTimesheetId: number;
    workScheduleSetting?: string;
    adjustmentType: TimeAdjustmentType;
}
