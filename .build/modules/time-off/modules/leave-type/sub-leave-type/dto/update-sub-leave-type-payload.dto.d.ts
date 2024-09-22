import { BaseParamDto } from '../../../../../../common/dto';
import { UpdateSubLeaveTypeBodyDto } from './update-sub-leave-type-body.dto';
export declare class UpdateSubLeaveTypePayloadDto extends BaseParamDto {
    userEmail: string;
    parentLeaveTypeId: number;
    bodyDto: UpdateSubLeaveTypeBodyDto;
}
