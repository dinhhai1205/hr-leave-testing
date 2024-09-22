import { DataSource, EntitySubscriberInterface, InsertEvent } from 'typeorm';
import { DatabaseConfig } from '../../../../config';
import { DocumentEntity } from '../../../../core/database/entities/document.entity';
export declare class DocumentSubscriber implements EntitySubscriberInterface<DocumentEntity> {
    private readonly dbConfig;
    constructor(dbConfig: Pick<DatabaseConfig, 'type'>, dataSource: DataSource);
    listenTo(): typeof DocumentEntity;
    private makeRecordNo;
    afterInsert(event: InsertEvent<DocumentEntity>): Promise<void>;
}
