"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayrollReportSchema = void 0;
const mongoose_1 = require("mongoose");
const company_schema_1 = require("./company.schema");
const employee_schema_1 = require("./employee.schema");
const payroll_categories_schema_1 = require("./payroll-categories.schema");
const payroll_header_schema_1 = require("./payroll-header.schema");
exports.PayrollReportSchema = new mongoose_1.Schema({
    CompanyId: Number,
    PayrollHeaderId: Number,
    EmployeeId: Number,
    EmployeeRef: String,
    FullNameLocal: String,
    Company: company_schema_1.CompanySchema,
    Employee: employee_schema_1.EmployeeSchema,
    PayrollHeader: payroll_header_schema_1.PayrollHeaderSchema,
    PayCategories: payroll_categories_schema_1.PayrollCategoriesSchema,
});
//# sourceMappingURL=payroll-report.schema.js.map