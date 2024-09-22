export declare class PaginationQueryDto {
    readonly page: number;
    readonly take: number;
    readonly q: string;
    readonly isDeleted: boolean;
    readonly ids?: string[];
    readonly sorts?: string[];
    readonly createdFrom?: string;
    readonly createdTo?: string;
}
