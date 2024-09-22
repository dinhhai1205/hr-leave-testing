import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CompanyMappingService } from '../../modules/company-mapping/company-mapping.service';
import { TimeTrackerApiService } from '../../libs/api/api.service';
import { EmployeeMappingService } from '../../modules/employee-mapping/employee-mapping.service';
import { GroupMappingService } from '../../modules/group-mapping/group-mapping.service';
export declare class TimeTrackerEmployeeInfoGuard implements CanActivate {
    private readonly reflector;
    private readonly companyMappingService;
    private readonly timeTrackerApiService;
    private readonly employeeMappingService;
    private readonly groupMappingService;
    constructor(reflector: Reflector, companyMappingService: CompanyMappingService, timeTrackerApiService: TimeTrackerApiService, employeeMappingService: EmployeeMappingService, groupMappingService: GroupMappingService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
