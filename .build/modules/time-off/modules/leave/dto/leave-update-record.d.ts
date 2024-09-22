import { ELeaveDuration } from '../../../../../common/enums';
export declare class LeaveUpdateRecordDto {
    id?: number;
    leaveTypeId: number;
    reason: string;
    dateFrom: Date;
    fromFdHd: ELeaveDuration;
    dateTo: Date;
    toFdHd: ELeaveDuration;
    employeeId: number;
}
