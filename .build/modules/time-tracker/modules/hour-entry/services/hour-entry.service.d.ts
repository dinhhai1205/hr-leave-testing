import { CreateHourEntryDto, DeleteHourEntryDto, UpdateHourEntryDto } from '../dtos';
import { TimeTrackerApiService } from '../../../libs/api/api.service';
import { EmployeeMappingService } from '../../employee-mapping/employee-mapping.service';
import { GetHourEntryDto } from '../dtos/get-hour-entry.dto';
export declare class HourEntryService {
    private readonly apiService;
    private readonly employeeMappingService;
    constructor(apiService: TimeTrackerApiService, employeeMappingService: EmployeeMappingService);
    getHourEntry(companyId: number, ttCompanyId: string, getHourEntry: GetHourEntryDto, employeeId: number): Promise<any>;
    createHourEntry(companyId: number, ttCompanyId: string, createHourEntry: CreateHourEntryDto): Promise<any>;
    updateHourEntry(companyId: number, ttCompanyId: string, updateHourEntry: UpdateHourEntryDto, id: string): Promise<any>;
    deleteHourEntry(companyId: number, ttCompanyId: string, deleteHoursEntryDto: DeleteHourEntryDto, id: string): Promise<any>;
}
