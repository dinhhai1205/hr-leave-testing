import { TimeTrackerApiService } from '../../libs/api/api.service';
export declare class TimeTrackerStreamImgService {
    private readonly apiService;
    constructor(apiService: TimeTrackerApiService);
    getProjectImage(keyEncode: string): Promise<string>;
    getCompanyImage(keyEncode: string): Promise<any>;
}
