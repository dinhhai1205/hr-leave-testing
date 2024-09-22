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
exports.SlackConsumer = void 0;
const bullmq_1 = require("@nestjs/bullmq");
const enums_1 = require("../../common/enums");
const config_1 = require("../../config");
const queue_1 = require("../../core/queue");
const slack_service_1 = require("./slack.service");
let SlackConsumer = class SlackConsumer extends queue_1.WorkerHostProcessor {
    constructor(appConfig, slackService) {
        super();
        this.appConfig = appConfig;
        this.slackService = slackService;
        this.PROCESS = queue_1.QUEUE.SLACK.PROCESS;
    }
    async process(job, token) {
        switch (job.name) {
            case this.PROCESS.POST_MESSAGE: {
                return this.postMessage(job.data);
            }
            default:
                break;
        }
    }
    async postMessage(jobData) {
        const isStagOrProd = this.appConfig.nodeEnv === enums_1.ENodeEnv.STAGING ||
            this.appConfig.nodeEnv === enums_1.ENodeEnv.PRODUCTION;
        if (isStagOrProd)
            await this.slackService.postMessage(jobData);
    }
};
exports.SlackConsumer = SlackConsumer;
exports.SlackConsumer = SlackConsumer = __decorate([
    (0, bullmq_1.Processor)(queue_1.QUEUE.SLACK.PROCESSOR),
    __param(0, (0, config_1.InjectAppConfig)()),
    __metadata("design:paramtypes", [Object, slack_service_1.SlackService])
], SlackConsumer);
//# sourceMappingURL=slack.consumer.js.map