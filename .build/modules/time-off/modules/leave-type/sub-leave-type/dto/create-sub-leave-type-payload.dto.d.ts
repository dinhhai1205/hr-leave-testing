import { BaseParamDto } from '../../../../../../common/dto';
export declare class CreateSubLeaveTypePayload extends BaseParamDto {
    userEmail: string;
    subLeaveTypeId: number;
    parentLeaveTypeId: number;
}
