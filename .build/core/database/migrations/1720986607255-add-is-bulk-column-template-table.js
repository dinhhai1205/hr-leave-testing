"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddIsBulkColumnTemplateTable1720986607255 = void 0;
const typeorm_1 = require("typeorm");
const enums_1 = require("../enums");
const utils_1 = require("../utils");
class AddIsBulkColumnTemplateTable1720986607255 {
    async up(queryRunner) {
        const tableName = enums_1.ETableName.DOCUMENT_TEMPLATE;
        const columns = {
            is_bulk: 'is_bulk',
            bulk_actions: 'bulk_actions',
        };
        const [hasColumnIsBulk, hasColumnBulkActions] = await Promise.all([
            queryRunner.hasColumn(tableName, columns.is_bulk),
            queryRunner.hasColumn(tableName, columns.bulk_actions),
        ]);
        if (!hasColumnIsBulk) {
            await queryRunner.addColumn(tableName, new typeorm_1.TableColumn({
                name: 'is_bulk',
                type: (0, utils_1.columnType)('BOOLEAN'),
                default: (0, utils_1.defaultColumn)({ columnType: 'BOOLEAN', value: false }),
                isNullable: true,
            }));
        }
        if (!hasColumnBulkActions) {
            await queryRunner.addColumn(tableName, new typeorm_1.TableColumn({
                name: 'bulk_actions',
                type: (0, utils_1.columnType)('JSONB'),
                isNullable: true,
                length: (0, utils_1.defaultColumn)({ columnType: 'JSONB' }),
                default: "'[]'",
            }));
        }
    }
    async down() { }
}
exports.AddIsBulkColumnTemplateTable1720986607255 = AddIsBulkColumnTemplateTable1720986607255;
//# sourceMappingURL=1720986607255-add-is-bulk-column-template-table.js.map