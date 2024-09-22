import type { EAuthType } from '../enums';
export declare const AUTH_TYPE = "auth_type";
export declare const AuthType: (authState: EAuthType) => import("@nestjs/common").CustomDecorator<string>;
