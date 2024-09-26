import { EEmployeeModuleType } from '../enums/employee-module-type.enum';
export declare class PaginationEmployeeQueryDto {
    moduleType?: EEmployeeModuleType;
    readonly workScheduleIds?: number[];
    readonly projectIds?: string[];
    readonly taskIds?: string[];
    readonly isSelectAll: boolean;
    readonly page: number;
    readonly take: number;
    readonly q: string;
    readonly ids?: number[];
    readonly createdFrom?: string;
    readonly createdTo?: string;
    readonly isDeleted: boolean;
}
