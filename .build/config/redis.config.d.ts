import type { ConfigType } from '@nestjs/config';
type IRedisConfig = {
    host: string;
    port: number;
    password?: string;
    ttl: number;
};
export declare const redisConfig: (() => IRedisConfig) & import("@nestjs/config").ConfigFactoryKeyHost<IRedisConfig>;
export type RedisConfig = ConfigType<typeof redisConfig>;
export declare const InjectRedisConfig: () => PropertyDecorator & ParameterDecorator;
export {};
