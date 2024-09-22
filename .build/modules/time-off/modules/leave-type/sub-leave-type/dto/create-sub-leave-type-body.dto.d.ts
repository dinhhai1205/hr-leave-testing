import { LeaveTypeCreationDto } from '../../dto/leave-type-creation.dto';
declare const CreateSubLeaveTypeBodyDto_base: import("@nestjs/common").Type<Omit<LeaveTypeCreationDto, "allowApplyExceed" | "includePublicHoliday" | "includeNonWorkingDay" | "cfRoundTo">>;
export declare class CreateSubLeaveTypeBodyDto extends CreateSubLeaveTypeBodyDto_base {
}
export {};
