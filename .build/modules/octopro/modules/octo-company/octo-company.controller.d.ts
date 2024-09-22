import { OctoCompanyRequestService } from './octo-company-request.service';
export declare class OctoCompanyController {
    private readonly octoCompanyRequestService;
    constructor(octoCompanyRequestService: OctoCompanyRequestService);
    syncDataToMongo(octoCompanyCode: string): Promise<PromiseSettledResult<any>[]>;
}
