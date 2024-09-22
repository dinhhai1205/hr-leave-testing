import { AdjustmentStatus, TimeAdjustmentType, TimeSheetAdjustmentType } from '../enums';
import { BaseAppEntity } from './base-app.entity';
import { PayElementMappingEntity } from './pay-element-mapping.entity';
import { PayrollTimeSheetEntity } from './payroll-timesheet.entity';
export declare class TimeSheetAdjustmentEntity extends BaseAppEntity {
    timeSheetType: TimeSheetAdjustmentType;
    status: AdjustmentStatus;
    payElementMappingId: number;
    date: string;
    hour: number;
    daysToProrate: number;
    payrollTimesheetId: number;
    companyId: number;
    workScheduleSetting: string;
    adjustmentType: TimeAdjustmentType;
    leaveId: number;
    uuid: string;
    day: number;
    payroll: PayrollTimeSheetEntity;
    payElementMapping: PayElementMappingEntity;
}
