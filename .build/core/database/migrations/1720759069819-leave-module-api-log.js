"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeaveModuleApiLog1720759069819 = void 0;
const typeorm_1 = require("typeorm");
const enums_1 = require("../enums");
const utils_1 = require("../utils");
class LeaveModuleApiLog1720759069819 {
    async up(queryRunner) {
        const createTableIfNotExist = true;
        await queryRunner.createTable(new typeorm_1.Table({
            name: enums_1.ETableName.LEAVE_MODULE_API_LOG,
            columns: [
                {
                    name: 'id',
                    type: 'bigint',
                    generationStrategy: 'increment',
                    isPrimary: true,
                    isGenerated: true,
                    isUnique: true,
                },
                {
                    name: 'company_id',
                    type: 'bigint',
                    isNullable: true,
                },
                {
                    name: 'method',
                    type: 'varchar',
                    isNullable: true,
                },
                {
                    name: 'url',
                    type: 'varchar',
                    isNullable: true,
                },
                {
                    name: 'body',
                    type: 'varchar',
                    isNullable: true,
                },
                {
                    name: 'status_code',
                    type: (0, utils_1.columnType)('INTEGER'),
                    isNullable: true,
                },
                {
                    name: 'status_message',
                    type: 'varchar',
                    isNullable: true,
                },
                {
                    name: 'ip_address',
                    type: 'varchar',
                    isNullable: true,
                },
                {
                    name: 'user_agent',
                    type: 'varchar',
                    isNullable: true,
                },
                {
                    name: 'time_ms',
                    type: (0, utils_1.columnType)('INTEGER'),
                    isNullable: true,
                },
                {
                    name: 'user_email',
                    type: 'varchar',
                    isNullable: true,
                },
                {
                    name: 'created_on',
                    type: (0, utils_1.columnType)('DATETIME'),
                    isNullable: true,
                },
            ],
        }), createTableIfNotExist);
    }
    async down() { }
}
exports.LeaveModuleApiLog1720759069819 = LeaveModuleApiLog1720759069819;
//# sourceMappingURL=1720759069819-leave-module-api-log.js.map