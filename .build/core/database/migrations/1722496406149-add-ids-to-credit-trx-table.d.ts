import type { MigrationInterface, QueryRunner } from 'typeorm';
export declare class AddIdsToCreditTrxTable1722496406149 implements MigrationInterface {
    name?: string | undefined;
    transaction?: boolean | undefined;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
