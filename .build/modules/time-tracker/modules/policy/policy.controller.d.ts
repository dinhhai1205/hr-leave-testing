import { PolicyService } from './policy.service';
import { CreatePolicyDto, UpdatePolicyDto } from './dtos';
import { BaseParamDto } from '../../../../common/dto';
import { TimeTrackerMapping } from '../../common/decorators/type';
export declare class PolicyController {
    private policyService;
    constructor(policyService: PolicyService);
    create(createPolicyDto: Omit<CreatePolicyDto, 'companyId'>, { companyId }: BaseParamDto, { timeTrackerCompanyId }: TimeTrackerMapping): Promise<any>;
    update(updatePolicy: Omit<UpdatePolicyDto, 'companyId'>, { companyId }: BaseParamDto, { timeTrackerCompanyId }: TimeTrackerMapping): Promise<any>;
    get({ companyId }: BaseParamDto, { timeTrackerCompanyId }: TimeTrackerMapping): Promise<any>;
}
