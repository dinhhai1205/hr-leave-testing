import { GeneralOptions } from '../../common/types';
import { TimeTrackerApiService } from '../../libs/api/api.service';
import { CompanyResponseDto, CreateDataCompanyDto, UpdateCompanyDataDto } from './dtos';
import { CompanyService } from '../../../general/modules/company';
import { CompanyMappingService } from '../company-mapping/company-mapping.service';
import { TimeTrackerEmployeeService } from '../employee/employee.service';
import { WorkScheduleService } from '../work-schedule';
export declare class TimeTrackerCompanyService {
    private readonly apiService;
    private readonly companyMappingService;
    private readonly companyService;
    private readonly ttEmployeeService;
    private readonly workScheduleService;
    constructor(apiService: TimeTrackerApiService, companyMappingService: CompanyMappingService, companyService: CompanyService, ttEmployeeService: TimeTrackerEmployeeService, workScheduleService: WorkScheduleService);
    createCompanyService(payload: CreateDataCompanyDto, companyId: number): Promise<{
        company: CompanyResponseDto;
        apiKey: string;
    }>;
    createSyncCompanyService(companyId: number): Promise<{
        company: CompanyResponseDto;
        apiKey: string;
    }>;
    getCompanyById(options: GeneralOptions): Promise<CompanyResponseDto>;
    updateCompany(payload: UpdateCompanyDataDto, options: GeneralOptions): Promise<CompanyResponseDto>;
    deleteCompany(options: GeneralOptions): Promise<CompanyResponseDto>;
    getTtCompanyId(companyId: number): Promise<import("../../../../core/database").CompanyMappingEntity | null>;
    isExistedCompanyMapping(companyId: number): Promise<{
        isCompanyTimeTracker: boolean;
    }>;
}
