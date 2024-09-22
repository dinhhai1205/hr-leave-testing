import { Repository } from 'typeorm';
import { TrxApprovalUserEntity } from '../../../../core/database/entities/trx-approval-user.entity';
import { LegacyBaseService } from '../../../../core/database/services';
export declare class TrxApprovalUserService extends LegacyBaseService<TrxApprovalUserEntity> {
    readonly trxApprovalUserRepository: Repository<TrxApprovalUserEntity>;
    constructor(trxApprovalUserRepository: Repository<TrxApprovalUserEntity>);
}
