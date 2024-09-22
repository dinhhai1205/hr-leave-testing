import { EBoolean, EOrder } from '../enums';
export declare class PaginationDto {
    readonly order: EOrder;
    readonly sort?: string;
    readonly page: number;
    readonly take: number;
    get skip(): number;
    readonly q: string;
    readonly isDeleted: EBoolean;
    ids?: string[] | number[];
    createdFrom: string;
    createdTo: string;
    readonly isSelectAll: boolean;
}
