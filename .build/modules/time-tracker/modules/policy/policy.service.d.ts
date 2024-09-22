import { TimeTrackerApiService } from '../../libs/api/api.service';
import { CreatePolicyDto, UpdatePolicyDto } from './dtos';
export declare class PolicyService {
    private readonly apiService;
    constructor(apiService: TimeTrackerApiService);
    createPolicy(createPolicyDto: CreatePolicyDto, ttCompanyId: string): Promise<any>;
    getPolicyByCompanyId(companyId: string): Promise<any>;
    updatePolicy(updatePolicyDto: UpdatePolicyDto, ttCompanyId: string): Promise<any>;
}
