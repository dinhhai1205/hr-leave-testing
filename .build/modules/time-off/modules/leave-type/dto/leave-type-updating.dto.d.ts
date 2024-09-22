import { ELeaveTypeRoundingOptions } from '../enums/leave-type-rounding-options.enum';
export declare class LeaveTypeUpdatingDto {
    code?: string;
    name: string;
    remark: string;
    paidLeave: boolean;
    color: string;
    startDate: Date;
    endDate: Date;
    allowApplyExceed: boolean;
    allowFutureDates: boolean;
    daysFromNow: number;
    allowPastDates: boolean;
    allowApplyHalfDay: boolean;
    cfRoundTo: ELeaveTypeRoundingOptions;
    daysAgo: number;
    daysInAdvance: number;
    maxDayApply: number;
    maxConsecutive: number;
    includePublicHoliday: boolean;
    includeNonWorkingDay: boolean;
    active: boolean;
    activeForEss: boolean;
    parentId?: number;
}
