import { PaginationDto } from './pagination.dto';
interface IPageMetaDtoParameters<T> {
    paginationDto: Pick<PaginationDto, 'page' | 'take' | 'isSelectAll'>;
    itemCount: number;
    data: T[];
    hasNextPage?: boolean;
    hasPreviousPage?: boolean;
}
export declare class PaginationResponseDto<T> {
    readonly page: number;
    readonly take: number;
    readonly itemCount: number;
    readonly pageCount: number;
    readonly hasPreviousPage: boolean;
    readonly hasNextPage: boolean;
    data: T[];
    constructor({ paginationDto, itemCount, data, hasNextPage, hasPreviousPage, }: IPageMetaDtoParameters<T>);
}
export {};
