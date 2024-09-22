"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddCarryToCreditTable1722411130763 = void 0;
const typeorm_1 = require("typeorm");
const enums_1 = require("../enums");
const utils_1 = require("../utils");
class AddCarryToCreditTable1722411130763 {
    async up(queryRunner) {
        const tableName = enums_1.ETableName.LEAVE_TYPE_POLICY_CREDIT;
        const createColumn = async function (columnName, tableColumn) {
            const hasColumn = await queryRunner.hasColumn(tableName, columnName);
            if (hasColumn) {
                console.warn(`The column ${columnName} is exist. Skip add column process`);
            }
            else {
                await queryRunner.addColumn(tableName, tableColumn);
                console.log(`The column ${columnName} of table ${tableName} is created successfully`);
            }
        };
        const columnNames = {
            leave_type_id: 'leave_type_id',
            carry_forward: 'carry_forward',
            carry_to_lt_id: 'carry_to_lt_id',
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
                case columnNames.carry_forward:
                    await createColumn(columnName, new typeorm_1.TableColumn({
                        type: (0, utils_1.columnType)('NUMERIC'),
                        name: columnName,
                        isNullable: true,
                    }));
                    break;
                case columnNames.carry_to_lt_id:
                    await createColumn(columnName, new typeorm_1.TableColumn({
                        type: 'bigint',
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
exports.AddCarryToCreditTable1722411130763 = AddCarryToCreditTable1722411130763;
//# sourceMappingURL=1722483860262-add-carry-to-credit-table.js.map