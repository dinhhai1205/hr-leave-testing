import { Repository } from 'typeorm';
import { EUserAgreementActions } from '../../../../common/enums';
import { UserAgreementEntity } from '../../../../core/database/entities';
import { TermsAndConditionsService } from '../terms-and-conditions/terms-and-conditions.service';
export declare class UserAgreementService {
    readonly repo: Repository<UserAgreementEntity>;
    private readonly termsAndConditionsService;
    constructor(repo: Repository<UserAgreementEntity>, termsAndConditionsService: TermsAndConditionsService);
    getUserAgreement(email: string): Promise<boolean>;
    update(action: EUserAgreementActions, email: string): Promise<any>;
}
