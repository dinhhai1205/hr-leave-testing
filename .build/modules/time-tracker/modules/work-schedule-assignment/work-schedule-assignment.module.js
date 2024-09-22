"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkScheduleAssignmentModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const work_schedule_assignment_entity_1 = require("../../../../core/database/entities/work-schedule-assignment.entity");
const queue_1 = require("../../../../core/queue");
const employee_module_1 = require("../../../user/modules/employee/employee.module");
const work_schedule_assignment_consumer_1 = require("./queues/work-schedule-assignment.consumer");
const work_schedule_assignment_controller_1 = require("./work-schedule-assignment.controller");
const work_schedule_assignment_service_1 = require("./work-schedule-assignment.service");
const work_schedule_module_1 = require("../work-schedule/work-schedule.module");
let WorkScheduleAssignmentModule = class WorkScheduleAssignmentModule {
};
exports.WorkScheduleAssignmentModule = WorkScheduleAssignmentModule;
exports.WorkScheduleAssignmentModule = WorkScheduleAssignmentModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([work_schedule_assignment_entity_1.WorkScheduleAssignmentEntity]),
            queue_1.QueueModule.register({
                queues: ['WORK_SCHEDULE_ASSIGNMENT', 'HRFORTE_NOTIFICATION'],
            }),
            employee_module_1.EmployeeModule,
            (0, common_1.forwardRef)(() => work_schedule_module_1.WorkScheduleModule),
        ],
        providers: [work_schedule_assignment_service_1.WorkScheduleAssignmentService, work_schedule_assignment_consumer_1.WorkScheduleAssignmentProcessor],
        exports: [work_schedule_assignment_service_1.WorkScheduleAssignmentService],
        controllers: [work_schedule_assignment_controller_1.WorkScheduleAssignmentController],
    })
], WorkScheduleAssignmentModule);
//# sourceMappingURL=work-schedule-assignment.module.js.map