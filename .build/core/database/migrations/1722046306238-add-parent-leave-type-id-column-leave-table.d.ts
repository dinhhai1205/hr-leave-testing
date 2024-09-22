import { type MigrationInterface, type QueryRunner } from 'typeorm';
export declare class AddParentLeaveTypeIdColumnLeaveTable1722046306238 implements MigrationInterface {
    private readonly logger;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
