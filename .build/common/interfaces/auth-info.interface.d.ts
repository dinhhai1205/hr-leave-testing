import type { RoleDetailEntity } from '../../core/database/entities/role-detail.entity';
import type { EApiAppMode } from '../enums/api-app-mode.enum';
import type { EApiModuleMode } from '../enums/api-module-mode.enum';
import type { EUserRanking } from '../enums/user-ranking.enum';
import type { IPermissionActions } from './permission-actions.interface';
export interface IAuthInfo {
    authEmployeeId?: number;
    authEmail: string;
    authRoleDetails?: RoleDetailEntity[];
    authPermission?: {
        leave: IPermissionActions;
        approval: IPermissionActions;
        payroll: IPermissionActions;
    };
    appMode: EApiAppMode;
    ranking: EUserRanking;
    module?: EApiModuleMode;
    utcOffset: number;
    organizationPaths: string[];
    isAdmin: boolean;
}
