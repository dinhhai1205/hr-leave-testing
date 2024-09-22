import { DataSource, EntitySubscriberInterface, InsertEvent } from 'typeorm';
import { DatabaseConfig } from '../../../../../config';
import { LeaveEntity } from '../../../../../core/database/entities/leave.entity';
import { LeaveService } from '../services/leave.service';
export declare class LeaveEntitySubscriber implements EntitySubscriberInterface<LeaveEntity> {
    private readonly leaveService;
    private dbConfig;
    constructor(dataSource: DataSource, leaveService: LeaveService, dbConfig: DatabaseConfig);
    listenTo(): typeof LeaveEntity;
    afterInsert(event: InsertEvent<LeaveEntity>): Promise<void>;
}
