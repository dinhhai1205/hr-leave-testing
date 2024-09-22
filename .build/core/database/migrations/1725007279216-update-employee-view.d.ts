import type { MigrationInterface, QueryRunner } from 'typeorm';
export declare class UpdateEmployeeView1725007279216 implements MigrationInterface {
    private createOrUpdateCommand;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
