import { Repository } from 'typeorm';
import { IAuthInfo } from '../../../../../common/interfaces';
import { LeaveTypeEntity } from '../../../../../core/database/entities/leave-type.entity';
import { LeaveEntity } from '../../../../../core/database/entities/leave.entity';
import { LeaveCreationDto } from '../dto/leave-creation.dto';
import { LeaveUpdateRecordDto } from '../dto/leave-update-record';
export declare class LeaveHelper {
    leaveRecordHaveValidLeaveType(leaveType?: Pick<LeaveTypeEntity, 'isDeleted' | 'active'>): void;
    allowDateRangeOfLeave(leave: Pick<LeaveEntity | LeaveCreationDto | LeaveUpdateRecordDto, 'dateFrom' | 'dateTo'>, leaveType: Pick<LeaveTypeEntity, 'startDate' | 'endDate'>): void;
    allowToApplyHalfDayLeave(leave: Pick<LeaveEntity | LeaveCreationDto | LeaveUpdateRecordDto, 'toFdHd' | 'fromFdHd'>, leaveType: Pick<LeaveTypeEntity, 'allowApplyHalfDay'>): void;
    leaveApplicationShouldBeSubmittedBefore(currentDate: Date, leave: Pick<LeaveEntity | LeaveCreationDto | LeaveUpdateRecordDto, 'dateFrom'>, leaveType: Pick<LeaveTypeEntity, 'daysInAdvance'>): void;
    allowToApplyLeaveInTheFuture(currentDate: Date, leave: Pick<LeaveEntity | LeaveCreationDto | LeaveUpdateRecordDto, 'dateFrom' | 'dateTo'>, leaveType: Pick<LeaveTypeEntity, 'daysFromNow' | 'allowFutureDates'>): void;
    allowToApplyLeaveInThePast(currentDate: Date, leave: Pick<LeaveEntity | LeaveCreationDto | LeaveUpdateRecordDto, 'dateFrom' | 'dateTo'>, leaveType: Pick<LeaveTypeEntity, 'daysAgo' | 'allowPastDates'>): void;
    maximumLeaveThatCanBeAppliedPerApplication(effectiveDays: number, leaveType: Pick<LeaveTypeEntity, 'maxDayApply'>): void;
    allowUserToApplyEvenLeaveExceedBalance(effectiveDays: number, leaveTypeBalance: number, leaveType: Pick<LeaveTypeEntity, 'allowApplyExceed'>): void;
    duplicateLeaveRecordInDateRange(companyId: number, leave: Pick<LeaveEntity | LeaveCreationDto | LeaveUpdateRecordDto, 'id' | 'dateFrom' | 'dateTo' | 'employeeId' | 'leaveTypeId' | 'fromFdHd' | 'toFdHd'>, leaveRepo: Repository<LeaveEntity>): Promise<void>;
    validateUpdateLeaveRecord(authInfo: Pick<IAuthInfo, 'appMode' | 'authEmployeeId' | 'ranking'>, leaveRecord: Pick<LeaveEntity, 'employee' | 'leaveType' | 'statusId' | 'employeeId'> | null): asserts leaveRecord is Required<LeaveEntity>;
}
