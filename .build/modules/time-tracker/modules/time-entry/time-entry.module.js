"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeEntryModule = void 0;
const common_1 = require("@nestjs/common");
const api_module_1 = require("../../libs/api/api.module");
const time_entry_controller_1 = require("./time-entry.controller");
const services_1 = require("./services");
const employee_mapping_module_1 = require("../employee-mapping/employee-mapping.module");
const company_mapping_module_1 = require("../company-mapping/company-mapping.module");
const group_mapping_module_1 = require("../group-mapping/group-mapping.module");
const work_schedule_1 = require("../work-schedule");
const leave_module_1 = require("../../../time-off/modules/leave/leave.module");
const employee_module_1 = require("../../../user/modules/employee/employee.module");
const timesheet_adjustment_module_1 = require("../timesheet-adjustment/timesheet-adjustment.module");
const prtrx_hdr_module_1 = require("../../../payroll/modules/prtrx-hdr/prtrx-hdr.module");
const time_entry_ess_controller_1 = require("./time-entry-ess.controller");
let TimeEntryModule = class TimeEntryModule {
};
exports.TimeEntryModule = TimeEntryModule;
exports.TimeEntryModule = TimeEntryModule = __decorate([
    (0, common_1.Module)({
        imports: [
            api_module_1.TimeTrackerApiModule,
            employee_mapping_module_1.EmployeeMappingModule,
            company_mapping_module_1.CompanyMappingModule,
            group_mapping_module_1.GroupMappingModule,
            work_schedule_1.WorkScheduleModule,
            leave_module_1.LeaveModule,
            timesheet_adjustment_module_1.TimeSheetAdjustmentModule,
            employee_module_1.EmployeeModule,
            prtrx_hdr_module_1.PrtrxHdrModule,
        ],
        controllers: [time_entry_controller_1.TimeEntryController, time_entry_ess_controller_1.TimeEntryESSController],
        providers: [
            services_1.TimeEntryService,
            services_1.ExportTimeEntriesExcelFileService,
            services_1.TimeSheetService,
        ],
        exports: [
            services_1.TimeEntryService,
            services_1.ExportTimeEntriesExcelFileService,
            services_1.TimeSheetService,
        ],
    })
], TimeEntryModule);
//# sourceMappingURL=time-entry.module.js.map