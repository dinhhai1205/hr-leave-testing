import { BaseTimeTrackerEntity } from '../../common/entities/base.entity';
import { RoleName } from '../../common';
export declare class EmployeeEntity extends BaseTimeTrackerEntity {
    companyId: string;
    workScheduleId: string;
    groupWorkScheduleId: string;
    userId: string;
    roleId: string;
    roleName: RoleName;
    email: string;
    firstName: string;
    lastName: string;
    avatar: string;
    phone: string;
    address: string;
    age: number;
    gender: string;
    country: string;
    timezone: string;
    active: boolean;
}
