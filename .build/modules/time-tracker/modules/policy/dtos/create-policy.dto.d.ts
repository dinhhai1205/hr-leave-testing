import { CreateTimeTrackingSettingDto } from '../../time-tracking-setting/dtos';
import { CreateScheduleSettingDto } from '../../schedule-setting/dtos';
export declare class CreatePolicyDto {
    scheduleSetting: CreateScheduleSettingDto;
    timeTrackingSetting: CreateTimeTrackingSettingDto;
    userEmail: string;
}
