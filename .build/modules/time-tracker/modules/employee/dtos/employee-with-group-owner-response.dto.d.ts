import { EmployeeResponseDto } from './employee-response.dto';
import { RoleGroup } from '../../../common';
export declare class EmployeeWithGroupOwnerResponseDto extends EmployeeResponseDto {
    roleInGroups: RoleGroup;
}
