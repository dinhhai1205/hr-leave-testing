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
exports.LeaveTypePolicyProcessor = void 0;
const bullmq_1 = require("@nestjs/bullmq");
const queue_1 = require("../../../../../core/queue");
const leave_type_policy_service_1 = require("../leave-type-policy.service");
let LeaveTypePolicyProcessor = class LeaveTypePolicyProcessor extends queue_1.WorkerHostProcessor {
    constructor(leaveTypePolicyService) {
        super();
        this.leaveTypePolicyService = leaveTypePolicyService;
    }
    async process(job) {
        switch (job.name) {
            case queue_1.QUEUE.LEAVE_TYPE_POLICY.PROCESS.CREDIT:
                return this.creditLeaveBalancePolicy(job.data);
            case queue_1.QUEUE.LEAVE_TYPE_POLICY.PROCESS.DEDUCTION:
                return this.deductLeaveTypePolicyCredit(job.data);
            case queue_1.QUEUE.LEAVE_TYPE_POLICY.PROCESS.REVERTING:
                return this.revertLeaveTypePolicyCredit(job.data);
            default:
                break;
        }
    }
    async creditLeaveBalancePolicy(jobData) {
        const { batchSize, skip } = jobData;
        if (batchSize !== undefined && skip !== undefined) {
            await this.leaveTypePolicyService.leaveTypePolicyCreditAlgorithm({}, { batchSize, skip });
            return;
        }
    }
    async deductLeaveTypePolicyCredit(jobData) {
        await this.leaveTypePolicyService.deductLeaveTypePolicyCredit(jobData);
    }
    async revertLeaveTypePolicyCredit(jobData) {
        await this.leaveTypePolicyService.revertLeaveTypePolicyCredit(jobData);
    }
};
exports.LeaveTypePolicyProcessor = LeaveTypePolicyProcessor;
exports.LeaveTypePolicyProcessor = LeaveTypePolicyProcessor = __decorate([
    (0, bullmq_1.Processor)(queue_1.QUEUE.LEAVE_TYPE_POLICY.PROCESSOR),
    __metadata("design:paramtypes", [leave_type_policy_service_1.LeaveTypePolicyService])
], LeaveTypePolicyProcessor);
//# sourceMappingURL=leave-type-policy.consumer.js.map