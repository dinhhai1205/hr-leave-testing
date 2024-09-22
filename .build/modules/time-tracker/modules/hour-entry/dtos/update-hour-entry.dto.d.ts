import { CreateHourEntryDto } from './create-hour-entry.dto';
declare const UpdateHourEntryDto_base: import("@nestjs/common").Type<Partial<Pick<CreateHourEntryDto, "date" | "description" | "duration" | "unitTime" | "activityId" | "projectId" | "locationWorkScheduleId">>>;
export declare class UpdateHourEntryDto extends UpdateHourEntryDto_base {
}
export {};
