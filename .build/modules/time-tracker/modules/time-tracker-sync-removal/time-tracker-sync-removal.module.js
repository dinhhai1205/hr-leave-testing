"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeTrackerSyncRemovalModule = void 0;
const common_1 = require("@nestjs/common");
const api_module_1 = require("../../libs/api/api.module");
const auto_deduction_module_1 = require("../auto-deduction/auto-deduction.module");
const break_rule_module_1 = require("../break-rule/break-rule.module");
const day_schedule_module_1 = require("../day-schedule/day-schedule.module");
const employee_mapping_module_1 = require("../employee-mapping/employee-mapping.module");
const company_mapping_module_1 = require("../company-mapping/company-mapping.module");
const group_mapping_module_1 = require("../group-mapping/group-mapping.module");
const time_tracker_sync_removal_controller_1 = require("./time-tracker-sync-removal.controller");
const time_tracker_sync_removal_service_1 = require("./time-tracker-sync-removal.service");
const work_schedule_1 = require("../work-schedule");
let TimeTrackerSyncRemovalModule = class TimeTrackerSyncRemovalModule {
};
exports.TimeTrackerSyncRemovalModule = TimeTrackerSyncRemovalModule;
exports.TimeTrackerSyncRemovalModule = TimeTrackerSyncRemovalModule = __decorate([
    (0, common_1.Module)({
        imports: [
            api_module_1.TimeTrackerApiModule,
            auto_deduction_module_1.AutoDeductionModule,
            break_rule_module_1.BreakRuleModule,
            day_schedule_module_1.DayScheduleModule,
            employee_mapping_module_1.EmployeeMappingModule,
            company_mapping_module_1.CompanyMappingModule,
            group_mapping_module_1.GroupMappingModule,
            work_schedule_1.WorkScheduleModule,
        ],
        controllers: [time_tracker_sync_removal_controller_1.TimeTrackerSyncRemovalController],
        providers: [time_tracker_sync_removal_service_1.TimeTrackerSyncRemovalService],
        exports: [time_tracker_sync_removal_service_1.TimeTrackerSyncRemovalService],
    })
], TimeTrackerSyncRemovalModule);
//# sourceMappingURL=time-tracker-sync-removal.module.js.map