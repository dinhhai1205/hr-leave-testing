import { GeneralOptions } from '../../../common/types/general-options.types';
import { TimeTrackerApiService } from '../../../libs/api/api.service';
import { EmployeeMappingService } from '../../employee-mapping/employee-mapping.service';
import { GetTimeEntriesOverviewQueryDto, GetTimeSheetQuery } from '../dtos';
import { GroupMappingService } from '../../group-mapping/group-mapping.service';
import { WorkScheduleService } from '../../work-schedule';
export declare class TimeSheetService {
    private readonly apiService;
    private readonly employeeMappingService;
    private readonly groupMappingService;
    private readonly workScheduleService;
    constructor(apiService: TimeTrackerApiService, employeeMappingService: EmployeeMappingService, groupMappingService: GroupMappingService, workScheduleService: WorkScheduleService);
    getTimeSheetOfEmployee({ query, companyId, employeeId, options, }: {
        query: GetTimeSheetQuery;
        companyId: number;
        employeeId: number;
        options: GeneralOptions;
    }): Promise<any>;
    getTimeSheetOverviewByCompanyId({ query, companyId, options, }: {
        query: GetTimeEntriesOverviewQueryDto;
        companyId: number;
        options: GeneralOptions;
    }): Promise<any>;
}
