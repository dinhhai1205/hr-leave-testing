import { IMulterFileUploaded } from '../../../../common/interfaces';
import { TimeTrackerCompanyService } from './company.service';
import { CompanyResponseDto, UpdateCompanyDto } from './dtos';
import { TimeTrackerMapping } from '../../common/decorators/type';
export declare class CompanyController {
    private readonly companyService;
    constructor(companyService: TimeTrackerCompanyService);
    isExistedCompanyMapping(companyId: number): Promise<{
        isCompanyTimeTracker: boolean;
    }>;
    createSyncCompany(companyId: number): Promise<{
        company: CompanyResponseDto;
        apiKey: string;
    }>;
    findOneCompany(companyId: number, { timeTrackerCompanyId, timeTrackerGroupId }: TimeTrackerMapping): Promise<CompanyResponseDto>;
    updateCompany(companyId: number, file: IMulterFileUploaded, body: UpdateCompanyDto, { timeTrackerCompanyId }: TimeTrackerMapping): Promise<CompanyResponseDto>;
    removeCompany(companyId: number, { timeTrackerCompanyId }: TimeTrackerMapping): Promise<CompanyResponseDto>;
}
