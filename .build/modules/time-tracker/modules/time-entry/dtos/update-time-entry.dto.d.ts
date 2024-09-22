import { CreateTimeEntryBodyDto } from './create-time-entry-body.dto';
declare const UpdateTimeEntryDto_base: import("@nestjs/common").Type<Partial<Pick<CreateTimeEntryBodyDto, "description" | "timeEntryType" | "activityId" | "projectId" | "timeEntry" | "locationWorkScheduleId">>>;
export declare class UpdateTimeEntryDto extends UpdateTimeEntryDto_base {
}
export {};
