import { ELeaveDuration } from '../../../../../common/enums';
export declare class CreateLeaveABySlackBotBodyDto {
    email: string;
    reason?: string;
    dateFrom: string;
    dateTo: string;
    fromFdHd: ELeaveDuration;
    toFdHd: ELeaveDuration;
}
