import type { MigrationInterface, QueryRunner } from 'typeorm';
export declare class AddWorkScheduleColumns1725866079997 implements MigrationInterface {
    up(queryRunner: QueryRunner): Promise<void>;
    private addTableColumns;
    down(queryRunner: QueryRunner): Promise<void>;
}
