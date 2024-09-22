import { EEmployeeModuleType } from '../../employee/enums/employee-module-type.enum';
export declare class PaginationGroupQueryDto {
    moduleType?: EEmployeeModuleType;
    readonly workScheduleIds?: number[];
    readonly taskIds?: string[];
    readonly projectIds?: string[];
    readonly isSelectAll: boolean;
    readonly page: number;
    readonly take: number;
    readonly q: string;
    readonly ids?: number[];
    readonly isDeleted: boolean;
    readonly createdFrom?: string;
}
