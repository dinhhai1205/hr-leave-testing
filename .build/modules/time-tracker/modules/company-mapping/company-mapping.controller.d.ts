import { CompanyMappingService } from './company-mapping.service';
import { CreateCompanyMappingDto } from './dtos/create-company-mapping.dto';
import { TimeTrackerMapping } from '../../common/decorators/type';
export declare class CompanyMappingController {
    private companyMappingService;
    constructor(companyMappingService: CompanyMappingService);
    create(companyId: number, { apiKey }: CreateCompanyMappingDto, { timeTrackerCompanyId }: TimeTrackerMapping): Promise<import("../../../../core/database").CompanyMappingEntity[]>;
}
