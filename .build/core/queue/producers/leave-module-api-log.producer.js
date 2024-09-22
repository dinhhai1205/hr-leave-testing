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
var LeaveModuleApiLogProducer_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeaveModuleApiLogProducer = void 0;
const bullmq_1 = require("@nestjs/bullmq");
const common_1 = require("@nestjs/common");
const bullmq_2 = require("bullmq");
const constants_1 = require("../constants");
let LeaveModuleApiLogProducer = LeaveModuleApiLogProducer_1 = class LeaveModuleApiLogProducer {
    constructor(queue) {
        this.queue = queue;
        this.logger = new common_1.Logger(LeaveModuleApiLogProducer_1.name);
    }
    async addCreateLeaveModuleApiLogJob(jobData) {
        try {
            await this.queue.add(constants_1.QUEUE.LEAVE_MODULE_API_LOG.PROCESS.CREATE_API_LOG, jobData);
            return;
        }
        catch (error) {
            this.logger.error(error, error.stack);
        }
        finally {
        }
    }
};
exports.LeaveModuleApiLogProducer = LeaveModuleApiLogProducer;
exports.LeaveModuleApiLogProducer = LeaveModuleApiLogProducer = LeaveModuleApiLogProducer_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, bullmq_1.InjectQueue)(constants_1.QUEUE.LEAVE_MODULE_API_LOG.PROCESSOR)),
    __metadata("design:paramtypes", [bullmq_2.Queue])
], LeaveModuleApiLogProducer);
//# sourceMappingURL=leave-module-api-log.producer.js.map