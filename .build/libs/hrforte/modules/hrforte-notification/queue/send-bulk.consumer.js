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
exports.SendBulkConsumer = void 0;
const bullmq_1 = require("@nestjs/bullmq");
const queue_1 = require("../../../../../core/queue");
const hrforte_notification_service_1 = require("../hrforte-notification.service");
let SendBulkConsumer = class SendBulkConsumer extends queue_1.WorkerHostProcessor {
    constructor(hrforteNotificationService) {
        super();
        this.hrforteNotificationService = hrforteNotificationService;
        this.JOB_NAME = queue_1.QUEUE.HRFORTE_NOTIFICATION.PROCESS;
    }
    async process(job) {
        const { companyId, params } = job.data;
        switch (job.name) {
            case this.JOB_NAME.SEND_BULK: {
                return this.hrforteNotificationService.sendBulk(companyId, params);
            }
            default:
                break;
        }
        return;
    }
};
exports.SendBulkConsumer = SendBulkConsumer;
exports.SendBulkConsumer = SendBulkConsumer = __decorate([
    (0, bullmq_1.Processor)(queue_1.QUEUE.HRFORTE_NOTIFICATION.PROCESSOR),
    __metadata("design:paramtypes", [hrforte_notification_service_1.HrforteNotificationService])
], SendBulkConsumer);
//# sourceMappingURL=send-bulk.consumer.js.map