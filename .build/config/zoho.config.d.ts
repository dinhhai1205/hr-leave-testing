import type { ConfigType } from '@nestjs/config';
export declare const zohoConfig: (() => {
    apiUrl: string;
    accountUrl: string;
    domain: string;
    zohoSignVersion: string;
    webhookSecretKey: string;
    clientId: string;
    clientSecret: string;
    refreshToken: string;
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    apiUrl: string;
    accountUrl: string;
    domain: string;
    zohoSignVersion: string;
    webhookSecretKey: string;
    clientId: string;
    clientSecret: string;
    refreshToken: string;
}>;
export type ZohoConfig = ConfigType<typeof zohoConfig>;
export declare const InjectZohoConfig: () => PropertyDecorator & ParameterDecorator;
