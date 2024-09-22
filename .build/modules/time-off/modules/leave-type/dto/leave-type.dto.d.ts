import { AbstractDto } from '../../../../../common/dto/abstract.dto';
export declare class LeaveTypeDto extends AbstractDto {
    id: number;
    companyId: number;
    createdBy: string;
    code: string;
    name: string;
    remark: string;
    paidLeave: boolean;
    color: string;
    startDate: Date;
    endDate: Date;
    allowApplyExceed: boolean;
    allowFutureDates: boolean;
    allowPastDates: boolean;
    daysFromNow: number;
    daysAgo: number;
    daysInAdvance: number;
    maxDayApply: number;
    maxConsecutive: number;
    active: boolean;
    activeForEss: boolean;
}
