import type { ObjectLiteral, Repository, SelectQueryBuilder } from 'typeorm';
type Operator = '=' | '<=' | '<' | '>=' | '>' | 'LIKE' | 'IN' | 'NOT IN';
interface IBaseWhereOpts<TEntity, Key extends keyof TEntity> {
    field: Key;
    variable?: string;
}
interface IInAndWhereOpts<TEntity, Key extends keyof TEntity> extends IBaseWhereOpts<TEntity, Key> {
    operator: 'IN' | 'NOT IN';
    value: Array<TEntity[Key]>;
}
interface INormalAndWhereOpts<TEntity, Key extends keyof TEntity> extends IBaseWhereOpts<TEntity, Key> {
    operator: Exclude<Operator, 'IN' | 'NOT IN'>;
    value: TEntity[Key];
}
type WhereOpts<TEntity, Key extends keyof TEntity> = IInAndWhereOpts<TEntity, Key> | INormalAndWhereOpts<TEntity, Key>;
declare class TypeOrmPluginQueryBuilderPlugin<TEntity extends ObjectLiteral> {
    private queryBuilder;
    private readonly aliasEntity;
    constructor(queryBuilder: SelectQueryBuilder<TEntity>);
    getQueryBuilder(): SelectQueryBuilder<TEntity>;
    andDeletedIs(isDeleted: boolean): this;
    andActiveIs(active: boolean): this;
    andCompanyIdIs(companyId: number): this;
    andWherePlugin<Key extends keyof TEntity>(opts: WhereOpts<TEntity, Key>): this;
    orWherePlugin<Key extends keyof TEntity>(opts: WhereOpts<TEntity, Key>): this;
    private whereCondition;
}
export declare function createPluginQueryBuilder<TEntity extends ObjectLiteral>(alias: string, repository: Repository<TEntity>): TypeOrmPluginQueryBuilderPlugin<TEntity>;
export {};
