import { TimeTrackerCompanyService } from '../../company/company.service';
import { TimeTrackerEmployeeService } from '../../employee/employee.service';
import { GroupService } from '../../group/group.service';
import { WorkScheduleService } from '../../work-schedule';
export declare class SyncCompanyTimeTrackerService {
    private readonly companyService;
    private readonly employeeService;
    private readonly groupService;
    private readonly workScheduleService;
    constructor(companyService: TimeTrackerCompanyService, employeeService: TimeTrackerEmployeeService, groupService: GroupService, workScheduleService: WorkScheduleService);
    syncTimeTrackerCompanyInfo(companyId: number): Promise<(any[] | {
        company: import("../../company/dtos").CompanyResponseDto;
        apiKey: string;
    } | {
        message: string;
    } | null | undefined)[]>;
}
