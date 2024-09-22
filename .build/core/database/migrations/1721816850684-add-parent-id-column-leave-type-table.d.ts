import { type MigrationInterface, type QueryRunner } from 'typeorm';
export declare class AddParentIdColumnLeaveTypeTable1721816850684 implements MigrationInterface {
    private readonly logger;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
