"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateZEmployeeView1722338408941 = void 0;
const db_sql_type_enum_1 = require("../enums/db-sql-type.enum");
const database_type_util_1 = require("../utils/database-type.util");
class UpdateZEmployeeView1722338408941 {
    async up(queryRunner) {
        const createOrUpdateCommand = (0, database_type_util_1.databaseType)() === db_sql_type_enum_1.EDbSqlType.Postgres
            ? 'CREATE OR REPLACE VIEW'
            : `CREATE OR ALTER VIEW`;
        await queryRunner.query(`
            ${(0, database_type_util_1.databaseType)() === db_sql_type_enum_1.EDbSqlType.Mssql ? '' : 'DROP VIEW IF EXISTS z_employee;'}

            ${createOrUpdateCommand} z_employee AS SELECT 
                id,
                company_id,
                join_date,
                confirm_date,
                active,
                is_ess_enabled,
                payroll_group_id,
                email,
                employee_ref,
                full_name_local,
                employee_no,
                full_name_en,
                organization_element_id,
                job_grade_id,
                gender,
                contract_type,
                marital_status_id,
                created_on,
                updated_on,
                is_deleted,
                org_path,
                last_working_date,
                created_by,
                updated_by,
                contract_date_from,
                contract_date_to,
                seniority_date
            FROM ${(0, database_type_util_1.databaseType)() === db_sql_type_enum_1.EDbSqlType.Postgres ? '"public"."employee"' : '"employee"'};
    `);
    }
    async down(queryRunner) { }
}
exports.UpdateZEmployeeView1722338408941 = UpdateZEmployeeView1722338408941;
//# sourceMappingURL=1722338408941-update-z-employee-view.js.map