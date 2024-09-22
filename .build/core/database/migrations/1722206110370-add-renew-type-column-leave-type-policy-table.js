"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddRenewTypeColumnLeaveTypePolicyTable1722206110370 = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const policy_expire_type_enum_1 = require("../../../modules/time-off/modules/leave-type-policy/enums/policy-expire-type.enum");
const policy_renew_type_enum_1 = require("../../../modules/time-off/modules/leave-type-policy/enums/policy-renew-type.enum");
const enums_1 = require("../enums");
const utils_1 = require("../utils");
class AddRenewTypeColumnLeaveTypePolicyTable1722206110370 {
    constructor() {
        this.logger = new common_1.Logger(AddRenewTypeColumnLeaveTypePolicyTable1722206110370.name);
    }
    async up(queryRunner) {
        const tableName = enums_1.ETableName.LEAVE_TYPE_POLICY;
        const createColumn = async (columnName, tableColumn) => {
            const hasColumn = await queryRunner.hasColumn(tableName, columnName);
            if (hasColumn) {
                this.logger.warn(`The column ${columnName} is exist. Skip add column process`);
            }
            else {
                await queryRunner.addColumn(tableName, tableColumn);
                this.logger.log(`The column ${columnName} of table ${tableName} is created successfully`);
            }
        };
        const columnNames = {
            renew_type: 'renew_type',
            expire_type: 'expire_type',
            expire_in_days: 'expire_in_days',
            expire_in_from: 'expire_in_from',
        };
        const createColumnPromises = [];
        for (const [columnName] of Object.entries(columnNames)) {
            switch (columnName) {
                case 'renew_type':
                    createColumnPromises.push(createColumn(columnName, new typeorm_1.TableColumn({
                        type: 'varchar',
                        name: columnName,
                        isNullable: true,
                        default: `'${policy_renew_type_enum_1.EPolicyRenewType.PICK_MONTH_DAY}'`,
                    })));
                    break;
                case 'expire_type':
                    createColumnPromises.push(createColumn(columnName, new typeorm_1.TableColumn({
                        type: 'varchar',
                        name: columnName,
                        isNullable: true,
                        default: `'${policy_expire_type_enum_1.EPolicyExpireType.NEVER}'`,
                    })));
                    break;
                case 'expire_in_days':
                    createColumnPromises.push(createColumn(columnName, new typeorm_1.TableColumn({
                        type: (0, utils_1.columnType)('INTEGER'),
                        name: columnName,
                        isNullable: true,
                    })));
                    break;
                case 'expire_in_from':
                    createColumnPromises.push(createColumn(columnName, new typeorm_1.TableColumn({
                        type: 'varchar',
                        name: columnName,
                        isNullable: true,
                    })));
                    break;
                default:
                    break;
            }
        }
        await Promise.all(createColumnPromises);
        const expireOnDayCol = 'expire_on_day';
        const expireOnMonthCol = 'expire_on_month';
        await queryRunner.query(`
      UPDATE
          ${tableName}
      SET
          ${columnNames.expire_type} = CASE
              WHEN (
                  ${expireOnDayCol} IS NULL
                  OR ${expireOnDayCol} = 0
              )
              AND (
                  ${expireOnMonthCol} IS NULL
                  OR ${expireOnMonthCol} = 0
              ) THEN '${policy_expire_type_enum_1.EPolicyExpireType.NEVER}'

              WHEN (
                  ${expireOnDayCol} IS NOT NULL
                  AND ${expireOnDayCol} > 0
              )
              OR (
                  ${expireOnMonthCol} IS NOT NULL
                  AND ${expireOnMonthCol} > 0
              ) THEN '${policy_expire_type_enum_1.EPolicyExpireType.EXPIRE_ON}'
               
              ELSE '${policy_expire_type_enum_1.EPolicyExpireType.NEVER}' -- Default case, just in case
          END;
    `);
    }
    async down(queryRunner) { }
}
exports.AddRenewTypeColumnLeaveTypePolicyTable1722206110370 = AddRenewTypeColumnLeaveTypePolicyTable1722206110370;
//# sourceMappingURL=1722206110370-add-renew-type-column-leave-type-policy-table.js.map