import type { ConfigType } from '@nestjs/config';
interface IJwtConfig {
    secret: string;
    expiresIn: number;
}
export declare const jwtConfig: (() => IJwtConfig) & import("@nestjs/config").ConfigFactoryKeyHost<IJwtConfig>;
export type JwtConfig = ConfigType<typeof jwtConfig>;
export declare const InjectJwtConfig: () => PropertyDecorator & ParameterDecorator;
export {};
