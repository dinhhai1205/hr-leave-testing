"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Location1721637461727 = void 0;
const typeorm_1 = require("typeorm");
const enums_1 = require("../enums");
const utils_1 = require("../utils");
class Location1721637461727 {
    async up(queryRunner) {
        const tableExist = await queryRunner.hasTable(enums_1.ETableName.LOCATION);
        if (!tableExist) {
            await queryRunner.createTable(new typeorm_1.Table({
                name: enums_1.ETableName.LOCATION,
                columns: [
                    ...(0, utils_1.defaultBaseEntityColumnsMigration)(),
                    {
                        name: 'tt_location_id',
                        type: 'varchar',
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'address',
                        type: 'varchar',
                        isNullable: true,
                        default: "''",
                    },
                    {
                        name: 'latitude',
                        type: 'decimal',
                        precision: 10,
                        scale: 6,
                    },
                    {
                        name: 'longitude',
                        type: 'decimal',
                        precision: 10,
                        scale: 6,
                    },
                    {
                        name: 'geo_fence',
                        type: (0, utils_1.columnType)('JSONB'),
                        length: (0, utils_1.defaultColumn)({ columnType: 'JSONB' }),
                        default: "'[]'",
                    },
                    {
                        name: 'visible',
                        type: (0, utils_1.columnType)('BOOLEAN'),
                        default: (0, utils_1.defaultColumn)({
                            columnType: 'BOOLEAN',
                            value: true,
                        }),
                    },
                    {
                        name: 'company_id',
                        type: (0, utils_1.columnType)('INTEGER'),
                    },
                ],
            }), true);
            await queryRunner.createIndex(enums_1.ETableName.LOCATION, new typeorm_1.TableIndex({
                name: 'IDX_LOCATION_NAME_ADDRESS',
                columnNames: ['name', 'address'],
            }));
        }
    }
    async down(queryRunner) {
        const tableExist = await queryRunner.hasTable(enums_1.ETableName.LOCATION);
        if (tableExist) {
            await queryRunner.dropTable(enums_1.ETableName.LOCATION, true);
        }
    }
}
exports.Location1721637461727 = Location1721637461727;
//# sourceMappingURL=1721637461727-location.js.map