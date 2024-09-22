import type { ConfigType } from '@nestjs/config';
type IHrforteApiConfig = {
    apiUrl: string;
    apiKey: string;
};
export declare const hrforteApiConfig: (() => IHrforteApiConfig) & import("@nestjs/config").ConfigFactoryKeyHost<IHrforteApiConfig>;
export type HrforteApiConfig = ConfigType<typeof hrforteApiConfig>;
export declare const InjectHrforteApiConfig: () => PropertyDecorator & ParameterDecorator;
export {};
