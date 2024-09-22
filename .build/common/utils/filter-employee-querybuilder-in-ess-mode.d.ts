import type { SelectQueryBuilder } from 'typeorm';
import type { IAuthInfo } from '../interfaces/auth-info.interface';
import type { IObjectLiteral } from '../interfaces/object-literal.interface';
export declare function filterEmployeeQueryBuilderInEssMode<TEntity extends IObjectLiteral>(authInfo: IAuthInfo, queryBuilder: SelectQueryBuilder<TEntity>, queryBuilderOpts: {
    field: keyof TEntity;
    value: TEntity[keyof TEntity];
    customVariable?: string;
}): void;
