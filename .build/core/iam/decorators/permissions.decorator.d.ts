import type { FindOptionsSelect } from 'typeorm';
import type { EPermissionActions } from '../../../common/enums';
import { EApiAppMode } from '../../../common/enums';
import type { ApplyDecoratorsReturnedType } from '../../../common/types';
import type { EmployeeEntity } from '../../database/entities/employee.entity';
export declare const EApiAppMode_KEY = "apiAppModeKey";
export declare const PERMISSION_KEY = "permissionKey";
export declare const SELECT_EMPLOYEE_FIELDS_KEY = "selectedEmployeeFieldsKey";
type EssPermissionOpts = Partial<{
    selectedEmployeeFields: FindOptionsSelect<EmployeeEntity>;
}>;
export declare function Permissions(apiAppMode: EApiAppMode.ADMIN, permission: EPermissionActions): ApplyDecoratorsReturnedType;
export declare function Permissions(apiAppMode: EApiAppMode.ESS, opts?: EssPermissionOpts): ApplyDecoratorsReturnedType;
export {};
