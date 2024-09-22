import { EWorkSchedulePublishType } from '../enums/work-schedule-publish-type.enum';
export declare class PublishWorkScheduleBodyDto {
    startDate: string;
    endDate: string;
    publishType?: EWorkSchedulePublishType;
}
