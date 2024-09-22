"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddIdsToCreditTrxTable1722496406149 = void 0;
const typeorm_1 = require("typeorm");
const enums_1 = require("../enums");
const utils_1 = require("../utils");
class AddIdsToCreditTrxTable1722496406149 {
    async up(queryRunner) {
        const tableName = enums_1.ETableName.LEAVE_TYPE_POLICY_CREDIT_TRX;
        const createColumn = async function (columnName, tableColumn) {
            const hasColumn = await queryRunner.hasColumn(tableName, columnName);
            if (hasColumn) {
                console.warn(`The column ${columnName} is exist. Skip add column process`);
            }
            else {
                console.log(`The column ${columnName} of table ${tableName} is created successfully`);
                return queryRunner.addColumn(tableName, tableColumn);
            }
        };
        const columnNames = {
            leave_type_id: 'leave_type_id',
            leave_type_policy_id: 'leave_type_policy_id',
            reason: 'reason',
        };
        for await (const [columnName] of Object.entries(columnNames)) {
            switch (columnName) {
                case columnNames.leave_type_id:
                    await createColumn(columnName, new typeorm_1.TableColumn({
                        type: (0, utils_1.columnType)('BIGINT'),
                        name: columnName,
                        isNullable: true,
                    }));
                    break;
                case columnNames.leave_type_policy_id:
                    await createColumn(columnName, new typeorm_1.TableColumn({
                        type: (0, utils_1.columnType)('BIGINT'),
                        name: columnName,
                        isNullable: true,
                    }));
                    break;
                case columnNames.reason:
                    await createColumn(columnName, new typeorm_1.TableColumn({
                        type: 'varchar',
                        name: columnName,
                        isNullable: true,
                    }));
                    break;
                default:
                    break;
            }
        }
    }
    async down(queryRunner) { }
}
exports.AddIdsToCreditTrxTable1722496406149 = AddIdsToCreditTrxTable1722496406149;
//# sourceMappingURL=1722496406149-add-ids-to-credit-trx-table.js.map