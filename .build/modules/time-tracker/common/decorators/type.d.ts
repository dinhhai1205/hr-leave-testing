import type { GroupMappingEntity } from '../../../../core/database';
import type { CompanyMappingEntity } from '../../../../core/database/entities/company-mapping.entity';
import type { EmployeeMappingEntity } from '../../../../core/database/entities/employee-mapping.entity';
export type TimeTrackerMapping = Pick<CompanyMappingEntity, 'timeTrackerCompanyId'> & Pick<EmployeeMappingEntity, 'timeTrackerEmployeeId' | 'userEmail'> & Pick<GroupMappingEntity, 'timeTrackerGroupId'>;
