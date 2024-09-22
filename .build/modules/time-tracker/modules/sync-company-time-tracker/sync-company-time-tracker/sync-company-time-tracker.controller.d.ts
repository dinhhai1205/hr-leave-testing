import { SyncCompanyTimeTrackerService } from './sync-company-time-tracker.service';
export declare class SyncCompanyTimeTrackerController {
    private readonly syncCompanyTimeTrackerService;
    constructor(syncCompanyTimeTrackerService: SyncCompanyTimeTrackerService);
    syncTimeTrackerCompanyInfo(companyId: number): Promise<(any[] | {
        company: import("../../company/dtos").CompanyResponseDto;
        apiKey: string;
    } | {
        message: string;
    } | null | undefined)[]>;
}
