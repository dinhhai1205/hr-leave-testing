import type { ConfigType } from '@nestjs/config';
interface IMongoDbConfig {
    host: string;
    port: string;
    username: string;
    password: string;
    dbName: string;
}
export declare const mongoDbConfig: (() => IMongoDbConfig) & import("@nestjs/config").ConfigFactoryKeyHost<IMongoDbConfig>;
export type MongoDbConfig = ConfigType<typeof mongoDbConfig>;
export declare const InjectMongoDbConfig: () => PropertyDecorator & ParameterDecorator;
export {};
