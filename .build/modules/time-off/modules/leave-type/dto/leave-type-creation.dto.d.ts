import { ELeaveTypeRoundingOptions } from '../enums/leave-type-rounding-options.enum';
export declare class LeaveTypeCreationDto {
    code: string;
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
    daysAgo: number;
    daysInAdvance: number;
    maxDayApply: number;
    maxConsecutive: number;
    allowApplyHalfDay: boolean;
    includePublicHoliday: boolean;
    includeNonWorkingDay: boolean;
    cfRoundTo: ELeaveTypeRoundingOptions;
    active: boolean;
    activeForEss: boolean;
    parentId?: number;
}
