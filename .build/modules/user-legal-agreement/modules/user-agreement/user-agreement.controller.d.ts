import { UpdateUserAgreementActionDto, UpdateUserAgreementBodyDto } from './dto/update-user-agreement.dto';
import { UserAgreementService } from './user-agreement.service';
export declare class UserAgreementController {
    private readonly userAgreementService;
    constructor(userAgreementService: UserAgreementService);
    getUserAgreement(email: string): Promise<boolean>;
    updateUserAgreement({ action }: UpdateUserAgreementActionDto, { email }: UpdateUserAgreementBodyDto): Promise<any>;
}
