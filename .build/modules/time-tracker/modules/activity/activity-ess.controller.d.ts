import { BaseParamDto } from '../../../../common/dto';
import { ActivityService } from './activity.service';
export declare class ActivityEssController {
    private activityService;
    constructor(activityService: ActivityService);
    getListActivity(employeeId: number, { companyId }: BaseParamDto): Promise<any>;
}
