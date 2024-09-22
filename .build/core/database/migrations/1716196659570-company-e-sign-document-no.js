"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyESignDocumentNo1716196659570 = void 0;
const typeorm_1 = require("typeorm");
const constants_1 = require("../../../modules/e-sign/constants");
const enums_1 = require("../enums");
const utils_1 = require("../utils");
class CompanyESignDocumentNo1716196659570 {
    async up(queryRunner) {
        const createTableIfNotExist = true;
        await queryRunner.createTable(new typeorm_1.Table({
            name: enums_1.ETableName.COMPANY_E_SIGN_DOCUMENT_NO,
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
                    name: 'isdeleted',
                    type: (0, utils_1.columnType)('BOOLEAN'),
                    isNullable: true,
                },
                {
                    name: 'companyid',
                    type: 'bigint',
                    isNullable: true,
                },
                {
                    name: 'lastno',
                    type: 'bigint',
                    isNullable: true,
                },
            ],
        }), createTableIfNotExist);
        await queryRunner.query((0, utils_1.makeRecordNoQuery)(constants_1.MAKE_E_SIGN_DOCUMENT_NO_FUNC_NAME, enums_1.ETableName.COMPANY_E_SIGN_DOCUMENT_NO));
    }
    async down() { }
}
exports.CompanyESignDocumentNo1716196659570 = CompanyESignDocumentNo1716196659570;
//# sourceMappingURL=1716196659570-company-e-sign-document-no.js.map