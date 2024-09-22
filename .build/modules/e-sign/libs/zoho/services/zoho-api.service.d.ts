import { HttpService } from '@nestjs/axios';
import { AxiosRequestConfig } from 'axios';
import { ZohoTokenService } from './zoho-token.service';
export declare class ZohoApiService {
    private readonly tokenService;
    private readonly httpService;
    constructor(tokenService: ZohoTokenService, httpService: HttpService);
    request<TRes = any, TData = any>(configs: AxiosRequestConfig<TData>): Promise<import("axios").AxiosResponse<TRes, any>>;
}
