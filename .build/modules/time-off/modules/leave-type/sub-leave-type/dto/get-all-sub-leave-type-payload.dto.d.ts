import { BaseParamDto } from '../../../../../../common/dto';
import { GetAllSubLeaveTypeQueryDto } from './get-all-sub-leave-type-query.dto';
export declare class GetAllSubLeaveTypePayloadDto extends BaseParamDto {
    parentId: number;
    userEmail: string;
    queryDto: GetAllSubLeaveTypeQueryDto;
}
