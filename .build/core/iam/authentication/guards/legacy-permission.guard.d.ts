import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { EApiAppMode, EApiModuleMode, EPermissionActions, ERole } from '../../../../common/enums';
import { PermissionDetail } from '../../../../common/types/permission-detail.type';
export declare class LegacyPermissionGuard implements CanActivate {
    private reflector;
    constructor(reflector: Reflector);
    canActivate(context: ExecutionContext): Promise<boolean>;
    getDecorator<T>(key: string, context: ExecutionContext): T;
    canAccess(args: {
        appMode: EApiAppMode;
        permissionDetail?: PermissionDetail;
        requirePermission: EPermissionActions;
        requireRoles: ERole;
        module: EApiModuleMode;
    }): boolean;
}
