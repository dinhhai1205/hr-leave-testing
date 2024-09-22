"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeTrackerModule = void 0;
const common_1 = require("@nestjs/common");
const api_module_1 = require("./libs/api/api.module");
const activity_module_1 = require("./modules/activity/activity.module");
const client_module_1 = require("./modules/client/client.module");
const company_mapping_module_1 = require("./modules/company-mapping/company-mapping.module");
const employee_mapping_module_1 = require("./modules/employee-mapping/employee-mapping.module");
const company_module_1 = require("./modules/company/company.module");
const employee_module_1 = require("./modules/employee/employee.module");
const group_module_1 = require("./modules/group/group.module");
const project_module_1 = require("./modules/project/project.module");
const time_tracker_emp_guard_1 = require("./common/guards/time-tracker-emp.guard");
const dashboard_module_1 = require("./modules/dashboard/dashboard.module");
const group_mapping_module_1 = require("./modules/group-mapping/group-mapping.module");
const hour_entry_1 = require("./modules/hour-entry");
const payroll_timesheet_module_1 = require("./modules/payroll-timesheet/payroll-timesheet.module");
const policy_1 = require("./modules/policy");
const share_guard_service_module_1 = require("./modules/share-guard-service.module");
const sync_company_time_tracker_module_1 = require("./modules/sync-company-time-tracker/sync-company-time-tracker/sync-company-time-tracker.module");
const time_entry_module_1 = require("./modules/time-entry/time-entry.module");
const time_tracker_stream_img_module_1 = require("./modules/time-tracker-stream-img/time-tracker-stream-img.module");
const time_tracker_sync_removal_module_1 = require("./modules/time-tracker-sync-removal/time-tracker-sync-removal.module");
const timesheet_adjustment_module_1 = require("./modules/timesheet-adjustment/timesheet-adjustment.module");
const work_schedule_1 = require("./modules/work-schedule");
const work_schedule_assignment_module_1 = require("./modules/work-schedule-assignment/work-schedule-assignment.module");
const work_schedule_tag_1 = require("./modules/work-schedule-tag");
let TimeTrackerModule = class TimeTrackerModule {
};
exports.TimeTrackerModule = TimeTrackerModule;
exports.TimeTrackerModule = TimeTrackerModule = __decorate([
    (0, common_1.Module)({
        imports: [
            api_module_1.TimeTrackerApiModule,
            project_module_1.ProjectModule,
            company_mapping_module_1.CompanyMappingModule,
            employee_mapping_module_1.EmployeeMappingModule,
            client_module_1.ClientModule,
            work_schedule_1.WorkScheduleModule,
            company_module_1.TimeTrackerCompanyModule,
            activity_module_1.ActivityModule,
            group_module_1.GroupModule,
            employee_module_1.TimeTrackerEmployeeModule,
            policy_1.PolicyModule,
            time_entry_module_1.TimeEntryModule,
            group_mapping_module_1.GroupMappingModule,
            share_guard_service_module_1.SharedGuardModule,
            work_schedule_tag_1.WorkScheduleTagModule,
            dashboard_module_1.DashboardModule,
            hour_entry_1.HourEntryModule,
            timesheet_adjustment_module_1.TimeSheetAdjustmentModule,
            payroll_timesheet_module_1.PayrollTimeSheetModule,
            sync_company_time_tracker_module_1.SyncCompanyTimeTrackerModule,
            time_tracker_sync_removal_module_1.TimeTrackerSyncRemovalModule,
            time_tracker_stream_img_module_1.TimeTrackerStreamImgModule,
            work_schedule_assignment_module_1.WorkScheduleAssignmentModule,
        ],
        providers: [time_tracker_emp_guard_1.TimeTrackerEmployeeInfoGuard],
    })
], TimeTrackerModule);
//# sourceMappingURL=time-tracker.module.js.map