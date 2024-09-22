"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupModule = void 0;
const common_1 = require("@nestjs/common");
const organization_structure_module_1 = require("../../../../modules/general/modules/organization-structure/organization-structure.module");
const employee_module_1 = require("../../../../modules/user/modules/employee/employee.module");
const api_module_1 = require("../../libs/api/api.module");
const company_mapping_module_1 = require("../company-mapping/company-mapping.module");
const employee_mapping_module_1 = require("../employee-mapping/employee-mapping.module");
const group_mapping_module_1 = require("../group-mapping/group-mapping.module");
const group_controller_1 = require("./group.controller");
const group_service_1 = require("./group.service");
const company_user_role_1 = require("../../../user/modules/company-user-role");
const employee_module_2 = require("../employee/employee.module");
const typeorm_1 = require("@nestjs/typeorm");
const database_1 = require("../../../../core/database");
const work_schedule_1 = require("../work-schedule");
const work_schedule_assignment_module_1 = require("../work-schedule-assignment/work-schedule-assignment.module");
let GroupModule = class GroupModule {
};
exports.GroupModule = GroupModule;
exports.GroupModule = GroupModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([database_1.OrganizationStructureEntity]),
            api_module_1.TimeTrackerApiModule,
            organization_structure_module_1.OrganizationStructureModule,
            group_mapping_module_1.GroupMappingModule,
            employee_module_1.EmployeeModule,
            employee_mapping_module_1.EmployeeMappingModule,
            company_mapping_module_1.CompanyMappingModule,
            employee_mapping_module_1.EmployeeMappingModule,
            group_mapping_module_1.GroupMappingModule,
            company_user_role_1.CompanyUserRoleModule,
            employee_module_2.TimeTrackerEmployeeModule,
            work_schedule_1.WorkScheduleModule,
            work_schedule_assignment_module_1.WorkScheduleAssignmentModule,
        ],
        controllers: [group_controller_1.GroupController],
        providers: [group_service_1.GroupService],
        exports: [group_service_1.GroupService],
    })
], GroupModule);
//# sourceMappingURL=group.module.js.map