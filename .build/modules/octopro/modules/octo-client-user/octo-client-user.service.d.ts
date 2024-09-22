import { Repository } from 'typeorm';
import { OctoClientUserEntity } from '../../../../core/database/entities/octo-client-user.enttity';
import { LegacyBaseService } from '../../../../core/database/services';
export declare class OctoClientUserService extends LegacyBaseService<OctoClientUserEntity> {
    private readonly octoClientUserRepository;
    constructor(octoClientUserRepository: Repository<OctoClientUserEntity>);
}
