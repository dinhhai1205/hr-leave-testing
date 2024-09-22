import type { MigrationInterface, QueryRunner } from 'typeorm';
export declare class AddColumnWorkScheduleAssignmentColumn1726029822893 implements MigrationInterface {
    up(queryRunner: QueryRunner): Promise<void>;
    private addTableColumns;
    down(queryRunner: QueryRunner): Promise<void>;
}
