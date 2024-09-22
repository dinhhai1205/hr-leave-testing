import type { AuthType } from '../../enums';
export declare const AUTH_TYPE_KEY = "authType";
export declare const Auth: (...authTypes: AuthType[]) => import("@nestjs/common").CustomDecorator<string>;
