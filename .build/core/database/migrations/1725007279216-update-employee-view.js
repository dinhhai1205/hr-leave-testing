"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateEmployeeView1725007279216 = void 0;
const enums_1 = require("../enums");
const utils_1 = require("../utils");
class UpdateEmployeeView1725007279216 {
    constructor() {
        this.createOrUpdateCommand = (0, utils_1.databaseType)() === enums_1.EDbSqlType.Postgres
            ? 'CREATE OR REPLACE VIEW'
            : `CREATE OR ALTER VIEW`;
    }
    async up(queryRunner) {
        await queryRunner.query(`
        ${(0, utils_1.databaseType)() === enums_1.EDbSqlType.Mssql ? '' : 'DROP VIEW IF EXISTS z_employee;'}

        ${this.createOrUpdateCommand} z_employee AS 
        SELECT 
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
          seniority_date,
          work_schedule_id,
          cost_center_id,
          pay_calc_met,
          payroll_frequency_id,
          contract_reference_no
        FROM ${(0, utils_1.databaseType)() === enums_1.EDbSqlType.Postgres ? '"public"."employee"' : '"employee"'};
    `);
    }
    async down(queryRunner) {
        await queryRunner.query(`
      ${(0, utils_1.databaseType)() === enums_1.EDbSqlType.Mssql ? '' : 'DROP VIEW IF EXISTS z_employee;'}

      ${this.createOrUpdateCommand} z_employee AS 
      SELECT 
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
        created_by,
        updated_by,
        last_working_date,
        contract_date_from,
        contract_date_to,
        seniority_date
        FROM ${(0, utils_1.databaseType)() === enums_1.EDbSqlType.Postgres ? '"public"."employee"' : '"employee"'};
    `);
    }
}
exports.UpdateEmployeeView1725007279216 = UpdateEmployeeView1725007279216;
//# sourceMappingURL=1725007279216-update-employee-view.js.map