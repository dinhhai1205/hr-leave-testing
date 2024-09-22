import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { AppConfig, DatabaseConfig } from '../../../config';
export declare class TypeOrmConfigFactory implements TypeOrmOptionsFactory {
    private readonly appConfig;
    private readonly databaseConfig;
    constructor(appConfig: AppConfig, databaseConfig: DatabaseConfig);
    createTypeOrmOptions(): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions>;
}
