import type { FindOptionsSelect } from 'typeorm';
export declare function buildSelectCondition<TEntity>(obj: FindOptionsSelect<TEntity>, prefix?: string): string[];
