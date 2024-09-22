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
exports.WorkerHostProcessor = void 0;
const bullmq_1 = require("@nestjs/bullmq");
const common_1 = require("@nestjs/common");
const bullmq_2 = require("bullmq");
const moment = require("moment");
class WorkerHostProcessor extends bullmq_1.WorkerHost {
    constructor() {
        super(...arguments);
        this.logger = new common_1.Logger(WorkerHostProcessor.name);
    }
    onCompleted(job) {
        const { id, name, queueName, finishedOn, returnvalue } = job;
        const completionTime = finishedOn
            ? moment.utc(finishedOn).toISOString()
            : '';
        this.logger.log(`Job id: ${id}, name: ${name} completed in queue ${queueName} on ${completionTime}. Result: ${returnvalue}`);
    }
    onProgress(job) {
        const { id, name, progress } = job;
        this.logger.log(`Job id: ${id}, name: ${name} completes ${progress}%`);
    }
    onFailed(job) {
        const { id, name, queueName, failedReason } = job;
        this.logger.error(`Job id: ${id}, name: ${name} failed in queue ${queueName}. Failed reason: ${failedReason}`);
    }
    onActive(job) {
        const { id, name, queueName, timestamp } = job;
        const startTime = timestamp ? moment.utc(timestamp).toISOString() : '';
        this.logger.log(`Job id: ${id}, name: ${name} starts in queue ${queueName} on ${startTime}.`);
    }
}
exports.WorkerHostProcessor = WorkerHostProcessor;
__decorate([
    (0, bullmq_1.OnWorkerEvent)('completed'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [bullmq_2.Job]),
    __metadata("design:returntype", void 0)
], WorkerHostProcessor.prototype, "onCompleted", null);
__decorate([
    (0, bullmq_1.OnWorkerEvent)('progress'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [bullmq_2.Job]),
    __metadata("design:returntype", void 0)
], WorkerHostProcessor.prototype, "onProgress", null);
__decorate([
    (0, bullmq_1.OnWorkerEvent)('failed'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [bullmq_2.Job]),
    __metadata("design:returntype", void 0)
], WorkerHostProcessor.prototype, "onFailed", null);
__decorate([
    (0, bullmq_1.OnWorkerEvent)('active'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [bullmq_2.Job]),
    __metadata("design:returntype", void 0)
], WorkerHostProcessor.prototype, "onActive", null);
//# sourceMappingURL=worker-host.process.js.map