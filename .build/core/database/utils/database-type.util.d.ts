import 'dotenv/config';
import type { ValueOf } from '../../../common/types/value-of.type';
import type { EDbSqlType } from '../enums/db-sql-type.enum';
export declare function databaseType(): ValueOf<typeof EDbSqlType>;
