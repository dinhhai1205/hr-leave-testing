import { EmployeeEntity } from './employee.entity';
export declare class AspNetUsersEntity {
    id: number;
    email: string;
    fullName: string;
    userPhotoUrl: string;
    utcOffset: number;
    employee: EmployeeEntity;
}
