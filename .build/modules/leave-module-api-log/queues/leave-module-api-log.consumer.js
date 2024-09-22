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
exports.LeaveModuleApiLogConsumer = void 0;
const bullmq_1 = require("@nestjs/bullmq");
const queue_1 = require("../../../core/queue");
const leave_module_api_log_service_1 = require("../leave-module-api-log.service");
let LeaveModuleApiLogConsumer = class LeaveModuleApiLogConsumer extends queue_1.WorkerHostProcessor {
    constructor(leaveModuleApiLogService) {
        super();
        this.leaveModuleApiLogService = leaveModuleApiLogService;
    }
    async process(job) {
        switch (job.name) {
            case queue_1.QUEUE.LEAVE_MODULE_API_LOG.PROCESS.CREATE_API_LOG:
                return this.createApiLog(job.data);
            default:
                break;
        }
    }
    async createApiLog(jobData) {
        await this.leaveModuleApiLogService.create(jobData);
    }
};
exports.LeaveModuleApiLogConsumer = LeaveModuleApiLogConsumer;
exports.LeaveModuleApiLogConsumer = LeaveModuleApiLogConsumer = __decorate([
    (0, bullmq_1.Processor)(queue_1.QUEUE.LEAVE_MODULE_API_LOG.PROCESSOR),
    __metadata("design:paramtypes", [leave_module_api_log_service_1.LeaveModuleApiLogService])
], LeaveModuleApiLogConsumer);
//# sourceMappingURL=leave-module-api-log.consumer.js.map