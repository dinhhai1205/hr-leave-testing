import { CreatePolicyDto } from './create-policy.dto';
import { UpdateScheduleSettingDto } from '../../schedule-setting/dtos';
import { UpdateTimeTrackingSettingDto } from '../../time-tracking-setting/dtos';
declare const UpdatePolicyDto_base: import("@nestjs/common").Type<Pick<CreatePolicyDto, "userEmail">>;
export declare class UpdatePolicyDto extends UpdatePolicyDto_base {
    id: string;
    scheduleSetting: UpdateScheduleSettingDto;
    timeTrackingSetting: UpdateTimeTrackingSettingDto;
}
export {};
