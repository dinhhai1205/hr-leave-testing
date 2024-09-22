import { EOrder } from '../enums';
export declare class PaginationQueryDto {
    readonly page: number;
    readonly take: number;
    readonly q: string;
    readonly isDeleted: boolean;
    readonly ids?: number[];
    readonly sorts?: string[];
    readonly createdFrom?: string;
    readonly createdTo?: string;
    readonly order?: EOrder;
    sort?: string;
    readonly isSelectAll: boolean;
}
