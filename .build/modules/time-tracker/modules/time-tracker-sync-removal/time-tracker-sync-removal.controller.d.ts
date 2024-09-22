import { TimeTrackerSyncRemovalService } from './time-tracker-sync-removal.service';
import { TimeTrackerMapping } from '../../common';
export declare class TimeTrackerSyncRemovalController {
    private readonly timeTrackerSyncRemovalService;
    constructor(timeTrackerSyncRemovalService: TimeTrackerSyncRemovalService);
    deleteLinkedTTDataByCompanyId(companyId: number, { timeTrackerCompanyId }: TimeTrackerMapping): Promise<"Delete linked data time tracker successfully" | "Failed to delete linked data time tracker" | undefined>;
}
