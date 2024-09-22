import type { EPermissionActions, ERole } from '../enums';
interface ISetAuthorize {
    permission: EPermissionActions;
    roles: ERole[];
}
export declare const PERMISSION_KEY = "permission";
export declare const PermissionDecorator: (permission: EPermissionActions) => import("@nestjs/common").CustomDecorator<string>;
export declare const ROLES_KEY = "roles";
export declare const RolesDecorator: (...roles: ERole[]) => import("@nestjs/common").CustomDecorator<string>;
export declare function SetAuthorize(args: ISetAuthorize): <TFunction extends Function, Y>(target: object | TFunction, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void;
export {};
