import { BaseTimeTrackerEntity } from '../../common/entities/base.entity';
import { GroupEntity } from '../group/group.entity';
import { EmployeeEntity } from '../employee/employee.entity';
import { RoleGroup } from '../../common';
export declare class MemberEntity extends BaseTimeTrackerEntity {
    companyId: string;
    groupId: string;
    employeeId: string;
    role: RoleGroup;
    group: GroupEntity;
    employee: EmployeeEntity;
}
