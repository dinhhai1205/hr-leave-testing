import { HttpService } from '@nestjs/axios';
import { AxiosRequestConfig, Method } from 'axios';
import { HrforteApiConfig } from '../../../config';
export declare class HrforteApiService {
    private readonly hrforteApiConfig;
    private readonly httpService;
    baseRequestConfig: AxiosRequestConfig;
    constructor(hrforteApiConfig: HrforteApiConfig, httpService: HttpService);
    request<TRes = any, TData = any>(configs: Omit<AxiosRequestConfig<TData>, 'method'> & {
        method: Method;
    }): Promise<import("axios").AxiosResponse<TRes, any>>;
    requestWithoutWaiting<TData = any>(configs: Omit<AxiosRequestConfig<TData>, 'method'> & {
        method: Method;
    }): void;
}
