import { Repository } from 'typeorm';
import { OctoUserEntity } from '../../../../core/database/entities/octo-user.entity';
import { LegacyBaseService } from '../../../../core/database/services';
export declare class OctoUserService extends LegacyBaseService<OctoUserEntity> {
    private readonly octoUserRepository;
    constructor(octoUserRepository: Repository<OctoUserEntity>);
    getOctoUser(args: {
        companyId: number;
        email: string;
    }): Promise<OctoUserEntity | null>;
}
