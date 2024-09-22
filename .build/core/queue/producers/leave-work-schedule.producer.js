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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeaveWorkScheduleProducer = void 0;
const bullmq_1 = require("@nestjs/bullmq");
const common_1 = require("@nestjs/common");
const bullmq_2 = require("bullmq");
const constants_1 = require("../constants");
let LeaveWorkScheduleProducer = class LeaveWorkScheduleProducer {
    constructor(queue) {
        this.queue = queue;
    }
    async publishedWorkSchedule(args) {
        const { endDate, startDate, ttCompanyId, workScheduleId } = args;
        await this.queue.add(constants_1.QUEUE.WORK_SCHEDULE.PROCESS.PUBLISHED, {
            endDate,
            startDate,
            ttCompanyId,
            workScheduleId,
        });
    }
    async unpublishedWorkSchedule(args) {
        const { workScheduleId, ttCompanyId } = args;
        await this.queue.add(constants_1.QUEUE.WORK_SCHEDULE.PROCESS.UNPUBLISHED, {
            workScheduleId,
            ttCompanyId,
        });
    }
    async expiredWorkSchedule(args) {
        const { workScheduleId, ttCompanyId } = args;
        await this.queue.add(constants_1.QUEUE.WORK_SCHEDULE.PROCESS.EXPIRED, {
            workScheduleId,
            ttCompanyId,
        });
    }
};
exports.LeaveWorkScheduleProducer = LeaveWorkScheduleProducer;
exports.LeaveWorkScheduleProducer = LeaveWorkScheduleProducer = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, bullmq_1.InjectQueue)(constants_1.QUEUE.WORK_SCHEDULE.PROCESSOR)),
    __metadata("design:paramtypes", [bullmq_2.Queue])
], LeaveWorkScheduleProducer);
//# sourceMappingURL=leave-work-schedule.producer.js.map