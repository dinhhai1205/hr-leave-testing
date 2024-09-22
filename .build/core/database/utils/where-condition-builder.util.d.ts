import { Brackets as TypeOrmBrackets } from 'typeorm';
import type { IObjectLiteral } from '../../../common/interfaces';
import type { NestedKeys } from '../../../common/types/nested-keys.type';
type Operator = '=' | '<=' | '<' | '>=' | '>' | 'LIKE' | 'IN';
interface IBaseWhereOpts<TEntity, Key extends keyof TEntity> {
    field: Key;
    variable?: string;
}
interface ILikeAndWhereOpts<TEntity> {
    operator: 'LIKE';
    value: string;
    field: NestedKeys<TEntity>;
    variable?: string;
}
interface IInAndWhereOpts<TEntity, Key extends keyof TEntity> extends IBaseWhereOpts<TEntity, Key> {
    operator: 'IN';
    value: Array<TEntity[Key]>;
}
interface INormalAndWhereOpts<TEntity, Key extends keyof TEntity> extends IBaseWhereOpts<TEntity, Key> {
    operator: Exclude<Operator, 'IN'>;
    value: TEntity[Key];
}
type WhereOpts<TEntity, Key extends keyof TEntity> = INormalAndWhereOpts<TEntity, Key> | IInAndWhereOpts<TEntity, Key> | ILikeAndWhereOpts<TEntity>;
export declare class WhereConditionBuilder<TEntity> {
    private alias;
    conditions: Array<{
        whereCondition: string;
        parameter: IObjectLiteral;
    }>;
    constructor(alias: string);
    andIsDeletedFalse(): WhereConditionBuilder<TEntity>;
    andActiveTrue(): WhereConditionBuilder<TEntity>;
    private whereCondition;
    andWhere<Key extends keyof TEntity>(opts: WhereOpts<TEntity, Key>): this;
    orWhere<Key extends keyof TEntity>(opts: WhereOpts<TEntity, Key>): this;
    andWhereRaw(query: string): this;
    buildSql(): {
        condition: string;
        parameters: IObjectLiteral;
    };
    buildBracket(): TypeOrmBrackets;
    resetConditions(): this;
}
export {};
