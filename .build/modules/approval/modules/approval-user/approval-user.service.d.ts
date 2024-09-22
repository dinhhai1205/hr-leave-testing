import { Repository } from 'typeorm';
import { ApprovalUserEntity } from '../../../../core/database/entities';
import { TypeOrmBaseService } from '../../../../core/database/services';
export declare class ApprovalUserService extends TypeOrmBaseService<ApprovalUserEntity> {
    readonly approvalUserRepository: Repository<ApprovalUserEntity>;
    constructor(approvalUserRepository: Repository<ApprovalUserEntity>);
}
