import { TimeTrackerStreamImgService } from './time-tracker-stream-img.service';
export declare class TimeTrackerStreamImgController {
    private readonly timeTrackerStreamImgService;
    constructor(timeTrackerStreamImgService: TimeTrackerStreamImgService);
    getCompanyImage(key: string): Promise<any>;
}
