import type { ConfigType } from '@nestjs/config';
import type { EDbSqlType } from '../core/database/enums/db-sql-type.enum';
export declare const databaseConfig: (() => {
    ca: string;
    host: string;
    port: number;
    username: string;
    password: string;
    dbName: string;
    type: EDbSqlType;
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    ca: string;
    host: string;
    port: number;
    username: string;
    password: string;
    dbName: string;
    type: EDbSqlType;
}>;
export type DatabaseConfig = ConfigType<typeof databaseConfig>;
export declare const InjectDatabaseConfig: () => PropertyDecorator & ParameterDecorator;
