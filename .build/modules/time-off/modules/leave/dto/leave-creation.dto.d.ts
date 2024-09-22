import { ELeaveDuration } from '../../../../../common/enums';
export declare class LeaveCreationDto {
    id?: number;
    employeeId: number;
    leaveTypeId: number;
    reason: string;
    dateFrom: Date;
    fromFdHd: ELeaveDuration;
    dateTo: Date;
    toFdHd: ELeaveDuration;
}
