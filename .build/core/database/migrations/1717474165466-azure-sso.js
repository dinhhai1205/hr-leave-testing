"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AzureSso1717474165466 = void 0;
const typeorm_1 = require("typeorm");
const enums_1 = require("../enums");
const utils_1 = require("../utils");
class AzureSso1717474165466 {
    async up(queryRunner) {
        const existedTable = await queryRunner.hasTable(enums_1.ETableName.AZURE_SSO);
        if (!existedTable) {
            await queryRunner.createTable(new typeorm_1.Table({
                name: enums_1.ETableName.AZURE_SSO,
                columns: [
                    {
                        name: 'id',
                        type: 'bigint',
                        generationStrategy: 'increment',
                        isPrimary: true,
                        isGenerated: true,
                        isUnique: true,
                        isNullable: true,
                    },
                    {
                        name: 'company_id',
                        type: 'bigint',
                        isNullable: true,
                    },
                    {
                        name: 'metadata_url',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'enable',
                        type: (0, utils_1.columnType)('BOOLEAN'),
                        isNullable: true,
                    },
                    {
                        name: 'created_on',
                        type: (0, utils_1.columnType)('DATETIME'),
                        isNullable: true,
                        default: 'CURRENT_TIMESTAMP',
                    },
                    {
                        name: 'updated_on',
                        type: (0, utils_1.columnType)('DATETIME'),
                        isNullable: true,
                    },
                    {
                        name: 'created_by',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'updated_by',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'is_deleted',
                        type: (0, utils_1.columnType)('BOOLEAN'),
                        isNullable: true,
                        default: (0, utils_1.defaultColumn)({ columnType: 'BOOLEAN', value: false }),
                    },
                ],
            }), true);
            return;
        }
    }
    async down() { }
}
exports.AzureSso1717474165466 = AzureSso1717474165466;
//# sourceMappingURL=1717474165466-azure-sso.js.map