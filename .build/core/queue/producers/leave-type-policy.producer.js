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
exports.LeaveTypePolicyProducer = void 0;
const bullmq_1 = require("@nestjs/bullmq");
const common_1 = require("@nestjs/common");
const bullmq_2 = require("bullmq");
const utils_1 = require("../../../common/utils");
const constants_1 = require("../constants");
let LeaveTypePolicyProducer = class LeaveTypePolicyProducer {
    constructor(queue) {
        this.queue = queue;
    }
    async addCreditJob(jobData) {
        const { currentDateNoTime, index, batchSize, skip } = jobData;
        await this.queue.add(constants_1.QUEUE.LEAVE_TYPE_POLICY.PROCESS.CREDIT, { batchSize, skip }, {
            jobId: `${constants_1.QUEUE.LEAVE_TYPE_POLICY.JOB_ID.CRONJOB_2AM_EVERY_DAY}-${currentDateNoTime}-${index}`,
        });
    }
    async addDeductionJob(jobData) {
        const hasEmptyValue = (0, utils_1.hasUndefinedOrNullObj)(jobData);
        if (!hasEmptyValue) {
            await this.queue.add(constants_1.QUEUE.LEAVE_TYPE_POLICY.PROCESS.DEDUCTION, jobData);
        }
    }
    async addRevertingJob(jobData) {
        const hasEmptyValue = (0, utils_1.hasUndefinedOrNullObj)(jobData);
        if (!hasEmptyValue) {
            await this.queue.add(constants_1.QUEUE.LEAVE_TYPE_POLICY.PROCESS.REVERTING, jobData);
        }
    }
};
exports.LeaveTypePolicyProducer = LeaveTypePolicyProducer;
exports.LeaveTypePolicyProducer = LeaveTypePolicyProducer = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, bullmq_1.InjectQueue)(constants_1.QUEUE.LEAVE_TYPE_POLICY.PROCESSOR)),
    __metadata("design:paramtypes", [bullmq_2.Queue])
], LeaveTypePolicyProducer);
//# sourceMappingURL=leave-type-policy.producer.js.map