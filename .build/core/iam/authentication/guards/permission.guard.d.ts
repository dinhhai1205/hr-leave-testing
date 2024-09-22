import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { REQUEST_ADMIN_KEY, REQUEST_ESS_KEY, REQUEST_USER_KEY } from '../../iam.constant';
import { IActiveAdminData, IActiveEssData, IActiveUserData } from '../../interfaces';
export interface IRequestActivatedUserData extends Request {
    [REQUEST_USER_KEY]: IActiveUserData;
    [REQUEST_ADMIN_KEY]?: IActiveAdminData;
    [REQUEST_ESS_KEY]?: IActiveEssData;
}
export declare class PermissionGuard implements CanActivate {
    private reflector;
    constructor(reflector: Reflector);
    canActivate(context: ExecutionContext): Promise<boolean>;
    private authorizeEss;
    private authorizeAdmin;
}
