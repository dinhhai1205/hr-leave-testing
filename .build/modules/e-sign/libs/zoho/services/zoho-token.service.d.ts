import { HttpService } from '@nestjs/axios';
import { ZohoConfig } from '../../../../../config';
export declare class ZohoTokenService {
    private readonly zohoConfig;
    private readonly httpService;
    private accessToken;
    private expiresIn;
    private pendingPromise;
    private axiosInstance;
    private accountUrl;
    constructor(zohoConfig: ZohoConfig, httpService: HttpService);
    private isTokenExpired;
    private refreshToken;
    synchronizedRefresh(): Promise<void>;
    getAccessToken(): Promise<string>;
}
