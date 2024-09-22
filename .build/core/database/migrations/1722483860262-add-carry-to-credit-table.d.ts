import { type MigrationInterface, type QueryRunner } from 'typeorm';
export declare class AddCarryToCreditTable1722411130763 implements MigrationInterface {
    name?: string | undefined;
    transaction?: boolean | undefined;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
