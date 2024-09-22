import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { RequestConfig, RequestOptions } from './api.type';
import { TimeTrackerConfig } from '../../../../config/time-tracker.config';
export declare class TimeTrackerApiService {
    private readonly httpService;
    private readonly timeTrackerConfig;
    private readonly req;
    private companyApiKey;
    private employeeEmail;
    private useMasterApiKey;
    private id;
    constructor(httpService: HttpService, timeTrackerConfig: TimeTrackerConfig, req: Request & {
        requestId?: string;
    });
    setRequestId(id: string): void;
    setCompanyApiKey(key: string): void;
    setEmail(email: string): void;
    setUseMasterApiKey(value: boolean): void;
    request<TRes = any, TData = any>(configs: RequestConfig<TData>, options?: RequestOptions): Promise<AxiosResponse<TRes, any>>;
}
