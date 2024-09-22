import type { DeepPartial, FindOneOptions, Repository, SelectQueryBuilder } from 'typeorm';
import type { PaginationQueryDto } from '../../../common/dto';
import { PaginationResponseDto } from '../../../common/dto';
import type { NestedKeys } from '../../../common/types/nested-keys.type';
import type { BaseAppEntity } from '../entities/base-app.entity';
type CreateEntityOpts = Partial<{
    userEmail: string;
    companyId: number;
}>;
export type UpdateEntityOpts<TEntity> = Partial<{
    userEmail: string;
    companyId: number;
    existingEntity: TEntity | null;
}>;
export declare class TypeOrmBaseService<TEntity extends BaseAppEntity> {
    readonly repository: Repository<TEntity>;
    protected readonly entityName: string;
    constructor(repository: Repository<TEntity>);
    protected create<TCreateDto extends DeepPartial<TEntity>>(createDto: TCreateDto, opts?: CreateEntityOpts): Promise<TEntity>;
    protected createMulti<TCreateDto extends DeepPartial<TEntity>>(createDto: TCreateDto[], opts?: CreateEntityOpts): Promise<TEntity[]>;
    protected createEntity<TCreateDto extends DeepPartial<TEntity>>(createDto: TCreateDto, opts?: CreateEntityOpts): TEntity;
    protected getEntitiesByQuery(args: {
        queryBuilder: SelectQueryBuilder<TEntity>;
        paginationQueryDto: PaginationQueryDto;
        querySearchFields?: Array<NestedKeys<TEntity>>;
        selectColumns?: string[];
    }): Promise<PaginationResponseDto<TEntity>>;
    protected getOne(findOneOptions: FindOneOptions<TEntity>): Promise<TEntity | null>;
    protected getOneOrFail(findOneOptions: FindOneOptions<TEntity>, opts?: Partial<{
        errMsg: string;
    }>): Promise<TEntity>;
    protected update<TUpdateDto extends DeepPartial<TEntity>>(id: number, updateDto: TUpdateDto, opts?: UpdateEntityOpts<TEntity>): Promise<TEntity>;
    private isAllowedType;
    protected delete(id: number, opts?: UpdateEntityOpts<TEntity>): Promise<TEntity>;
}
export {};
