import { HttpService } from '@nestjs/axios';
import { Request } from 'express';
import { HrforteApiConfig } from '../../../../config';
import { CompanyService } from '../../../general/modules/company';
export declare class OctoCompanyRequestService {
    private readonly companyService;
    private readonly httpService;
    private readonly hrforteApiConfig;
    private request;
    constructor(companyService: CompanyService, httpService: HttpService, hrforteApiConfig: HrforteApiConfig, request: Request);
    getJwtToken(): string;
    syncDataToMongo(octoCompanyCode: string): Promise<PromiseSettledResult<any>[]>;
    fetchSyncDataPayroll(args: {
        companyId: string;
        payrollHeaderId: string;
    }): Promise<any>;
}
