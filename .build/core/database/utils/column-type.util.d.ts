import type { ColumnType } from 'typeorm';
type StandardSqlType = 'DATETIME' | 'INTEGER' | 'BOOLEAN' | 'NUMERIC' | 'BIGINT' | 'JSONB' | 'NVARCHAR' | 'DATE' | 'UUID';
export declare function columnType(columnType: StandardSqlType): ColumnType;
export {};
