import { Repository } from 'typeorm';
import { IMulterFileUploaded } from '../../common/interfaces';
import { LeaveModuleApiLogEntity } from '../../core/database/entities/leave-module-api-log.entity';
import { EncryptionService } from '../../core/encryption';
import { AwsS3Service } from '../../libs/aws';
export declare class LeaveModuleApiLogService {
    private readonly leaveModuleApiLogRepo;
    private readonly awsS3Service;
    private readonly encryptionService;
    private rootFolder;
    constructor(leaveModuleApiLogRepo: Repository<LeaveModuleApiLogEntity>, awsS3Service: AwsS3Service, encryptionService: EncryptionService);
    create(args: Partial<LeaveModuleApiLogEntity & {
        files: IMulterFileUploaded[];
    }>): Promise<void>;
    deleteLogOverThreeMonths(): Promise<void>;
}
