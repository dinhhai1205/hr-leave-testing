"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldType1714723499435 = void 0;
const typeorm_1 = require("typeorm");
const enums_1 = require("../enums");
const utils_1 = require("../utils");
class FieldType1714723499435 {
    async up(queryRunner) {
        const createTableIfNotExist = true;
        await queryRunner.createTable(new typeorm_1.Table({
            name: enums_1.ETableName.FIELD_TYPE,
            columns: [
                ...(0, utils_1.defaultBaseEntityColumnsMigration)(),
                {
                    name: 'field_category',
                    type: 'varchar',
                    length: '50',
                },
                {
                    name: 'field_type_name',
                    type: 'varchar',
                    length: '50',
                },
                {
                    name: 'is_mandatory',
                    type: (0, utils_1.columnType)('BOOLEAN'),
                },
            ],
        }), createTableIfNotExist);
        const defaultTrueValue = (0, utils_1.defaultColumn)({
            columnType: 'BOOLEAN',
            value: true,
        });
        const defaultFalseValue = (0, utils_1.defaultColumn)({
            columnType: 'BOOLEAN',
            value: false,
        });
        const identityInsertOn = defaultTrueValue === 1 ? 'SET IDENTITY_INSERT field_type ON;' : '';
        const identityInsertOff = defaultTrueValue === 1 ? 'SET IDENTITY_INSERT field_type OFF;' : '';
        await queryRunner.query(`
      ${identityInsertOn}
      INSERT INTO "field_type" ("id","field_category","is_mandatory","field_type_name", "created_by", "created_on")
      VALUES
        (1,'image',${defaultTrueValue},'Signature', 'system_generated@hrforte.com', '2024-06-06 00:00:00'),
        (2,'image',${defaultTrueValue},'Stamp', 'system_generated@hrforte.com', '2024-06-06 00:00:00'),
        (3,'textfield',${defaultTrueValue},'Company', 'system_generated@hrforte.com', '2024-06-06 00:00:00'),
        (4,'textfield',${defaultTrueValue},'Email', 'system_generated@hrforte.com', '2024-06-06 00:00:00'),
        (5,'datefield',${defaultTrueValue},'Date', 'system_generated@hrforte.com', '2024-06-06 00:00:00'),
        (6,'textfield',${defaultTrueValue},'Jobtitle', 'system_generated@hrforte.com', '2024-06-06 00:00:00'),
        (7,'dropdown',${defaultFalseValue},'Dropdown', 'system_generated@hrforte.com', '2024-06-06 00:00:00'),
        (8,'image',${defaultTrueValue},'Initial', 'system_generated@hrforte.com', '2024-06-06 00:00:00'),
        (9,'image',${defaultFalseValue},'Image', 'system_generated@hrforte.com', '2024-06-06 00:00:00'),
        (10,'textfield',${defaultTrueValue},'Name', 'system_generated@hrforte.com', '2024-06-06 00:00:00'),
        (11,'textfield',${defaultFalseValue},'Textfield', 'system_generated@hrforte.com', '2024-06-06 00:00:00'),
        (12,'checkbox',${defaultFalseValue},'Checkbox', 'system_generated@hrforte.com', '2024-06-06 00:00:00'),
        (13,'radiogroup',${defaultFalseValue},'Radiogroup', 'system_generated@hrforte.com', '2024-06-06 00:00:00'),
        (14,'datefield',${defaultFalseValue},'CustomDate', 'system_generated@hrforte.com', '2024-06-06 00:00:00');
      ${identityInsertOff}
    `);
    }
    async down() { }
}
exports.FieldType1714723499435 = FieldType1714723499435;
//# sourceMappingURL=1714723499435-field-type.js.map