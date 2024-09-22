import { BreakRuleService } from '../break-rule/break-rule.service';
import { AutoDeductionService } from '../auto-deduction/auto-deduction.service';
import { DayScheduleService } from '../day-schedule/day-schedule.service';
import { WorkScheduleService } from '../work-schedule';
import { EmployeeMappingService } from '../employee-mapping/employee-mapping.service';
import { GroupMappingService } from '../group-mapping/group-mapping.service';
import { CompanyMappingService } from '../company-mapping/company-mapping.service';
import { TimeTrackerApiService } from '../../libs/api/api.service';
export declare class TimeTrackerSyncRemovalService {
    private readonly breakRuleService;
    private readonly autoDeductionService;
    private readonly dayScheduleService;
    private readonly workScheduleService;
    private readonly ttEmployeeService;
    private readonly ttGroupService;
    private readonly ttCompanyService;
    private readonly apiService;
    constructor(breakRuleService: BreakRuleService, autoDeductionService: AutoDeductionService, dayScheduleService: DayScheduleService, workScheduleService: WorkScheduleService, ttEmployeeService: EmployeeMappingService, ttGroupService: GroupMappingService, ttCompanyService: CompanyMappingService, apiService: TimeTrackerApiService);
    deleteLinkedTTData(companyId: number, ttCompanyId: string): Promise<"Delete linked data time tracker successfully" | "Failed to delete linked data time tracker" | undefined>;
}
