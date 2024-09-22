"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OvertimeModule = void 0;
const common_1 = require("@nestjs/common");
const overtime_service_1 = require("./overtime.service");
const overtime_controller_1 = require("./overtime.controller");
const employee_module_1 = require("../../../user/modules/employee/employee.module");
const work_schedule_1 = require("../../../time-tracker/modules/work-schedule");
const typeorm_1 = require("@nestjs/typeorm");
const database_1 = require("../../../../core/database");
const payroll_group_module_1 = require("../../../payroll/modules/payroll-group/payroll-group.module");
const overtime_detail_entity_1 = require("../../../../core/database/entities/overtime-detail.entity");
const overtime_hdr_entity_1 = require("../../../../core/database/entities/overtime-hdr.entity");
const work_schedule_assignment_module_1 = require("../../../time-tracker/modules/work-schedule-assignment/work-schedule-assignment.module");
let OvertimeModule = class OvertimeModule {
};
exports.OvertimeModule = OvertimeModule;
exports.OvertimeModule = OvertimeModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                database_1.CyclePeriodDetailEntity,
                database_1.CyclePeriodHeaderEntity,
                overtime_detail_entity_1.OvertimeDetailEntity,
                overtime_hdr_entity_1.OvertimeHeaderEntity,
            ]),
            employee_module_1.EmployeeModule,
            work_schedule_1.WorkScheduleModule,
            payroll_group_module_1.PayrollGroupModule,
            work_schedule_assignment_module_1.WorkScheduleAssignmentModule,
        ],
        controllers: [overtime_controller_1.OvertimeController],
        providers: [overtime_service_1.OvertimeService],
        exports: [overtime_service_1.OvertimeService],
    })
], OvertimeModule);
//# sourceMappingURL=overtime.module.js.map