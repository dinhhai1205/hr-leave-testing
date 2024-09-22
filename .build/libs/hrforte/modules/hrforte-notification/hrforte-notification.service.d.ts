import { HrforteApiConfig } from '../../../../config';
import { HrforteApiService } from '../../services';
import { IHrforteNotificationParam } from './interfaces';
export declare class HrforteNotificationService {
    private readonly hrforteApiConfig;
    private readonly hrforteApiService;
    private readonly apiPath;
    private readonly baseHeader;
    constructor(hrforteApiConfig: HrforteApiConfig, hrforteApiService: HrforteApiService);
    sendBulk(companyId: number, inputs: IHrforteNotificationParam[]): Promise<{
        data: string;
        status: number;
    }>;
}
