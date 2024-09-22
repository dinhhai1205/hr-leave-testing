"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeSheetAdjustmentModule = void 0;
const common_1 = require("@nestjs/common");
const timesheet_adjustment_controller_1 = require("./timesheet-adjustment.controller");
const typeorm_1 = require("@nestjs/typeorm");
const database_1 = require("../../../../core/database");
const work_schedule_1 = require("../work-schedule");
const employee_module_1 = require("../../../user/modules/employee/employee.module");
const services_1 = require("./services");
const pay_element_mapping_module_1 = require("../pay-element-mapping/pay-element-mapping.module");
const employee_mapping_module_1 = require("../employee-mapping/employee-mapping.module");
const api_module_1 = require("../../libs/api/api.module");
const leave_module_1 = require("../../../time-off/modules/leave/leave.module");
const prtrx_hdr_module_1 = require("../../../payroll/modules/prtrx-hdr/prtrx-hdr.module");
const company_mapping_module_1 = require("../company-mapping/company-mapping.module");
const group_mapping_module_1 = require("../group-mapping/group-mapping.module");
const payroll_timesheet_entity_1 = require("../../../../core/database/entities/payroll-timesheet.entity");
const payroll_group_module_1 = require("../../../payroll/modules/payroll-group/payroll-group.module");
const work_schedule_assignment_module_1 = require("../work-schedule-assignment/work-schedule-assignment.module");
let TimeSheetAdjustmentModule = class TimeSheetAdjustmentModule {
};
exports.TimeSheetAdjustmentModule = TimeSheetAdjustmentModule;
exports.TimeSheetAdjustmentModule = TimeSheetAdjustmentModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                database_1.TimeSheetAdjustmentEntity,
                payroll_timesheet_entity_1.PayrollTimeSheetEntity,
                database_1.CyclePeriodDetailEntity,
                database_1.CyclePeriodHeaderEntity,
                database_1.CycleFrequencyEntity,
            ]),
            work_schedule_1.WorkScheduleModule,
            employee_module_1.EmployeeModule,
            pay_element_mapping_module_1.PayElementMappingModule,
            employee_mapping_module_1.EmployeeMappingModule,
            api_module_1.TimeTrackerApiModule,
            (0, common_1.forwardRef)(() => leave_module_1.LeaveModule),
            prtrx_hdr_module_1.PrtrxHdrModule,
            company_mapping_module_1.CompanyMappingModule,
            group_mapping_module_1.GroupMappingModule,
            payroll_group_module_1.PayrollGroupModule,
            work_schedule_assignment_module_1.WorkScheduleAssignmentModule,
        ],
        controllers: [timesheet_adjustment_controller_1.TimeSheetAdjustmentController],
        providers: [
            services_1.TimeSheetAdjustmentService,
            services_1.ImportExportTimeSheetAdjustmentExcelFileService,
        ],
        exports: [services_1.TimeSheetAdjustmentService],
    })
], TimeSheetAdjustmentModule);
//# sourceMappingURL=timesheet-adjustment.module.js.map