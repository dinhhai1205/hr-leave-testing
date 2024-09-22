"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkScheduleAssignmentProcessor = void 0;
const bullmq_1 = require("@nestjs/bullmq");
const queue_1 = require("../../../../../core/queue");
const work_schedule_assignment_service_1 = require("../work-schedule-assignment.service");
let WorkScheduleAssignmentProcessor = class WorkScheduleAssignmentProcessor extends queue_1.WorkerHostProcessor {
    constructor(workScheduleAssignmentService) {
        super();
        this.workScheduleAssignmentService = workScheduleAssignmentService;
    }
    async process(job) {
        switch (job.name) {
            case queue_1.QUEUE.WORK_SCHEDULE_ASSIGNMENT.PROCESS.REMOVE:
                return this.handleRemoveWorkScheduleAssignment(job.data);
            default:
                break;
        }
    }
    async handleRemoveWorkScheduleAssignment(jobData) {
        await this.workScheduleAssignmentService.removeWorkScheduleAssignment(jobData);
    }
};
exports.WorkScheduleAssignmentProcessor = WorkScheduleAssignmentProcessor;
exports.WorkScheduleAssignmentProcessor = WorkScheduleAssignmentProcessor = __decorate([
    (0, bullmq_1.Processor)(queue_1.QUEUE.WORK_SCHEDULE_ASSIGNMENT.PROCESSOR),
    __metadata("design:paramtypes", [work_schedule_assignment_service_1.WorkScheduleAssignmentService])
], WorkScheduleAssignmentProcessor);
//# sourceMappingURL=work-schedule-assignment.consumer.js.map