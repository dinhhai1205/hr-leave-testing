import { BaseTimeTrackerEntity } from '../../common/entities/base.entity';
import { MemberEntity } from '../member/member.entity';
export declare class GroupEntity extends BaseTimeTrackerEntity {
    companyId: string;
    workScheduleId: string;
    holidayPolicyId: string;
    name: string;
    description: string;
    groupPath: string;
    parentId: string;
    active: boolean;
    parentGroup: GroupEntity;
    subGroups: GroupEntity[];
    members: MemberEntity[];
}
