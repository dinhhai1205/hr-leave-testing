import { Repository } from 'typeorm';
import { LeaveModuleApiLogEntity } from '../../core/database/entities/leave-module-api-log.entity';
export declare class LeaveModuleApiLogService {
    private readonly leaveModuleApiLogRepo;
    constructor(leaveModuleApiLogRepo: Repository<LeaveModuleApiLogEntity>);
    create(args: Partial<LeaveModuleApiLogEntity>): Promise<LeaveModuleApiLogEntity>;
    deleteLogOverThreeMonths(): Promise<void>;
}
