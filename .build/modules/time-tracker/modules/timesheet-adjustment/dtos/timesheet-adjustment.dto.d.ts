import { AdjustmentStatus, TimeAdjustmentType, TimeSheetAdjustmentType } from '../../../../../core/database';
export declare class TimeSheetAdjustmentDto {
    id: number;
    uuid: string;
    timeSheetType: TimeSheetAdjustmentType;
    status: AdjustmentStatus;
    payElementMappingId?: number;
    date?: string;
    hour: number;
    day: number;
    payrollTimesheetId: number;
    companyId: number;
    leaveId: number;
    workScheduleSetting?: string;
    adjustmentType: TimeAdjustmentType;
}
