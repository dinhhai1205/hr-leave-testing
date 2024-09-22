import { TimeTrackerMapping } from '../../common';
import { HourEntryService } from './services/hour-entry.service';
import { CreateHourEntryDto, DeleteHourEntryDto, UpdateHourEntryDto } from './dtos';
import { BaseParamDto } from '../../../../common/dto';
import { GetHourEntryDto } from './dtos/get-hour-entry.dto';
export declare class HourEntryController {
    private readonly hourEntryService;
    constructor(hourEntryService: HourEntryService);
    get({ companyId }: BaseParamDto, { timeTrackerCompanyId }: TimeTrackerMapping, employeeId: number, query: GetHourEntryDto): Promise<any>;
    create({ companyId }: BaseParamDto, createHourEntryDto: CreateHourEntryDto, { timeTrackerCompanyId }: TimeTrackerMapping): Promise<any>;
    updateHourEntry({ companyId }: BaseParamDto, hoursEntryId: string, updateHoursEntryDto: UpdateHourEntryDto, { timeTrackerCompanyId }: TimeTrackerMapping): Promise<any>;
    deletedHourEntry({ companyId }: BaseParamDto, deleteHoursEntryDto: DeleteHourEntryDto, hoursEntryId: string, { timeTrackerCompanyId }: TimeTrackerMapping): Promise<any>;
}
