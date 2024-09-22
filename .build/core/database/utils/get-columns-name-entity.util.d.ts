import type { IObjectLiteral } from '../../../common/interfaces/object-literal.interface';
import type { KeysOf } from '../../../common/types/keys-of.type';
export declare function getColumnNamesEntity<TEntity extends IObjectLiteral>(entity: TEntity, options?: Partial<{
    snakeCase: boolean;
    providedId: boolean;
    withPrefix: string;
    excludeColumns: KeysOf<TEntity>;
}>): string[];
