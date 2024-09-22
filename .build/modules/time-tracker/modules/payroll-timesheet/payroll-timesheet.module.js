"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayrollTimeSheetModule = void 0;
const common_1 = require("@nestjs/common");
const payroll_timesheet_controller_1 = require("./payroll-timesheet.controller");
const payroll_timesheet_service_1 = require("./payroll-timesheet.service");
const typeorm_1 = require("@nestjs/typeorm");
const payroll_timesheet_entity_1 = require("../../../../core/database/entities/payroll-timesheet.entity");
const work_schedule_1 = require("../work-schedule");
const employee_module_1 = require("../../../user/modules/employee/employee.module");
const timesheet_adjustment_module_1 = require("../timesheet-adjustment/timesheet-adjustment.module");
const database_1 = require("../../../../core/database");
const prtrx_hdr_module_1 = require("../../../payroll/modules/prtrx-hdr/prtrx-hdr.module");
const prtrx_emp_module_1 = require("../../../payroll/modules/prtrx-emp/prtrx-emp.module");
const payroll_group_module_1 = require("../../../payroll/modules/payroll-group/payroll-group.module");
const payroll_timesheet_v2_service_1 = require("./payroll-timesheet-v2.service");
const work_schedule_assignment_module_1 = require("../work-schedule-assignment/work-schedule-assignment.module");
let PayrollTimeSheetModule = class PayrollTimeSheetModule {
};
exports.PayrollTimeSheetModule = PayrollTimeSheetModule;
exports.PayrollTimeSheetModule = PayrollTimeSheetModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([payroll_timesheet_entity_1.PayrollTimeSheetEntity, database_1.CostCenterEntity]),
            work_schedule_1.WorkScheduleModule,
            employee_module_1.EmployeeModule,
            timesheet_adjustment_module_1.TimeSheetAdjustmentModule,
            prtrx_hdr_module_1.PrtrxHdrModule,
            prtrx_emp_module_1.PrtrxEmpModule,
            payroll_group_module_1.PayrollGroupModule,
            work_schedule_assignment_module_1.WorkScheduleAssignmentModule,
        ],
        controllers: [payroll_timesheet_controller_1.PayrollTimeSheetController],
        providers: [payroll_timesheet_service_1.PayrollTimeSheetService, payroll_timesheet_v2_service_1.PayrollTimeSheetServiceV2],
        exports: [payroll_timesheet_service_1.PayrollTimeSheetService, payroll_timesheet_v2_service_1.PayrollTimeSheetServiceV2],
    })
], PayrollTimeSheetModule);
//# sourceMappingURL=payroll-timesheet.module.js.map