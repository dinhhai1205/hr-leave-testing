import { Device } from '../../../common';
export declare class CreateTimeTrackingSettingDto {
    allowedDevices: Device[] | undefined;
    isProjectRequired: boolean | undefined;
    isActivityRequired: boolean | undefined;
    isManualLocationAllowed: boolean | undefined;
    isEditTimeEntriesAllowed: boolean | undefined;
}
