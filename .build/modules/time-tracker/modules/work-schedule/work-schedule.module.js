"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkScheduleModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const database_1 = require("../../../../core/database");
const employee_module_1 = require("../../../../modules/user/modules/employee/employee.module");
const organization_structure_module_1 = require("../../../general/modules/organization-structure/organization-structure.module");
const api_module_1 = require("../../libs/api/api.module");
const auto_deduction_module_1 = require("../auto-deduction/auto-deduction.module");
const break_rule_module_1 = require("../break-rule/break-rule.module");
const company_mapping_module_1 = require("../company-mapping/company-mapping.module");
const day_schedule_module_1 = require("../day-schedule/day-schedule.module");
const employee_mapping_module_1 = require("../employee-mapping/employee-mapping.module");
const group_mapping_module_1 = require("../group-mapping/group-mapping.module");
const location_work_schedule_module_1 = require("../location-work-schedule/location-work-schedule.module");
const work_schedule_assignment_module_1 = require("../work-schedule-assignment/work-schedule-assignment.module");
const work_schedule_controller_1 = require("./work-schedule.controller");
const work_schedule_service_1 = require("./work-schedule.service");
const queue_1 = require("../../../../core/queue");
const queue_2 = require("./queue");
const work_schedule_ess_controller_1 = require("./work-schedule-ess.controller");
let WorkScheduleModule = class WorkScheduleModule {
};
exports.WorkScheduleModule = WorkScheduleModule;
exports.WorkScheduleModule = WorkScheduleModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                database_1.AutoDeductionEntity,
                database_1.DayScheduleEntity,
                database_1.BreakRuleEntity,
                database_1.LocationEntity,
                database_1.LocationWorkScheduleEntity,
                database_1.WorkScheduleEntity,
            ]),
            api_module_1.TimeTrackerApiModule,
            auto_deduction_module_1.AutoDeductionModule,
            break_rule_module_1.BreakRuleModule,
            day_schedule_module_1.DayScheduleModule,
            location_work_schedule_module_1.LocationWorkScheduleModule,
            employee_mapping_module_1.EmployeeMappingModule,
            company_mapping_module_1.CompanyMappingModule,
            group_mapping_module_1.GroupMappingModule,
            employee_module_1.EmployeeModule,
            organization_structure_module_1.OrganizationStructureModule,
            work_schedule_assignment_module_1.WorkScheduleAssignmentModule,
            queue_1.QueueModule.register({ queues: ['WORK_SCHEDULE'] }),
        ],
        controllers: [work_schedule_controller_1.WorkScheduleController, work_schedule_ess_controller_1.WorkScheduleESSController],
        providers: [work_schedule_service_1.WorkScheduleService, queue_2.WorkScheduleProcessor],
        exports: [work_schedule_service_1.WorkScheduleService],
    })
], WorkScheduleModule);
//# sourceMappingURL=work-schedule.module.js.map