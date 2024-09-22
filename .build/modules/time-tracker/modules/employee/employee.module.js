"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeTrackerEmployeeModule = void 0;
const common_1 = require("@nestjs/common");
const employee_module_1 = require("../../../user/modules/employee/employee.module");
const api_module_1 = require("../../libs/api/api.module");
const company_mapping_module_1 = require("../company-mapping/company-mapping.module");
const employee_mapping_module_1 = require("../employee-mapping/employee-mapping.module");
const group_mapping_module_1 = require("../group-mapping/group-mapping.module");
const employee_controller_1 = require("./employee.controller");
const employee_service_1 = require("./employee.service");
const work_schedule_1 = require("../work-schedule");
const typeorm_1 = require("@nestjs/typeorm");
const entities_1 = require("../../../../core/database/entities");
const company_user_role_1 = require("../../../user/modules/company-user-role");
const project_module_1 = require("../project/project.module");
const work_schedule_assignment_module_1 = require("../work-schedule-assignment/work-schedule-assignment.module");
let TimeTrackerEmployeeModule = class TimeTrackerEmployeeModule {
};
exports.TimeTrackerEmployeeModule = TimeTrackerEmployeeModule;
exports.TimeTrackerEmployeeModule = TimeTrackerEmployeeModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([entities_1.EmployeeEntity]),
            api_module_1.TimeTrackerApiModule,
            employee_mapping_module_1.EmployeeMappingModule,
            employee_module_1.EmployeeModule,
            company_mapping_module_1.CompanyMappingModule,
            group_mapping_module_1.GroupMappingModule,
            work_schedule_1.WorkScheduleModule,
            company_user_role_1.CompanyUserRoleModule,
            project_module_1.ProjectModule,
            work_schedule_assignment_module_1.WorkScheduleAssignmentModule,
        ],
        controllers: [employee_controller_1.TimeTrackerEmployeeController],
        providers: [employee_service_1.TimeTrackerEmployeeService],
        exports: [employee_service_1.TimeTrackerEmployeeService],
    })
], TimeTrackerEmployeeModule);
//# sourceMappingURL=employee.module.js.map