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
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const schedule_1 = require("@nestjs/schedule");
const moment = require("moment");
const enums_1 = require("./common/enums");
const global_exception_filter_1 = require("./common/filters/global-exception.filter");
const interceptors_1 = require("./common/interceptors");
const assign_start_ms_middleware_1 = require("./common/middlewares/assign-start-ms.middleware");
const app_config_1 = require("./config/app.config");
const database_module_1 = require("./core/database/database.module");
const encryption_1 = require("./core/encryption");
const iam_1 = require("./core/iam");
const queue_1 = require("./core/queue");
const redis_1 = require("./core/redis");
const slack_module_1 = require("./libs/slack/slack.module");
const slack_service_1 = require("./libs/slack/slack.service");
const approval_module_1 = require("./modules/approval/approval.module");
const azure_sso_module_1 = require("./modules/azure-sso/azure-sso.module");
const e_sign_module_1 = require("./modules/e-sign/e-sign.module");
const general_module_1 = require("./modules/general/general.module");
const health_module_1 = require("./modules/health/health.module");
const leave_module_api_log_module_1 = require("./modules/leave-module-api-log/leave-module-api-log.module");
const octopro_module_1 = require("./modules/octopro/octopro.module");
const payroll_module_1 = require("./modules/payroll/payroll.module");
const statutory_report_module_1 = require("./modules/statutory-report/statutory-report.module");
const time_off_module_1 = require("./modules/time-off/time-off.module");
const time_tracker_module_1 = require("./modules/time-tracker/time-tracker.module");
const translate_1 = require("./modules/translate");
const user_legal_agreement_module_1 = require("./modules/user-legal-agreement/user-legal-agreement.module");
const user_module_1 = require("./modules/user/user.module");
let AppModule = class AppModule {
    constructor(appConfig, slackService) {
        this.appConfig = appConfig;
        this.slackService = slackService;
        this.nodeEnv = appConfig.nodeEnv;
    }
    configure(consumer) {
        consumer.apply(assign_start_ms_middleware_1.AssignStartMsMiddleware).forRoutes('*');
    }
    async beforeApplicationShutdown() {
        const text = this.applicationMessage('Nest application closed');
        await this.postMessage(text);
    }
    async onModuleInit() {
        const text = this.applicationMessage(`Nest application successfully started on port ${this.appConfig.appPort}`);
        await this.postMessage(text);
    }
    async postMessage(text) {
        switch (this.nodeEnv) {
            case enums_1.ENodeEnv.PRODUCTION:
            case enums_1.ENodeEnv.STAGING:
                await this.slackService.postMessage({
                    channel: '#general',
                    text: '```\n' + text + '\n```',
                });
                break;
            default:
                break;
        }
    }
    applicationMessage(additionalMessage = '') {
        const { nodeEnv, containerName, currentTimezone, containerId, imageName } = this.appConfig;
        const current = moment()
            .utc()
            .add(7, 'hours')
            .format('DD-MM-YYYY HH:mm:ss Z');
        const textObj = {
            current,
            currentTimezone,
            nodeEnv,
            imageName,
            containerName,
            containerId,
            additionalMessage,
        };
        const text = JSON.stringify(textObj, null, 2);
        return text;
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                envFilePath: ['.env'],
                isGlobal: true,
                load: [app_config_1.appConfig],
            }),
            schedule_1.ScheduleModule.forRoot(),
            database_module_1.DatabaseModule.forRoot(['typeorm', 'mongoose']),
            encryption_1.EncryptionModule,
            iam_1.IamModule,
            queue_1.QueueModule.forRoot({ isGlobal: true }),
            queue_1.QueueModule.register({ queues: ['LEAVE_MODULE_API_LOG', 'SLACK'] }),
            redis_1.RedisModule.forRoot({ isGlobal: true }),
            time_off_module_1.TimeOffModule,
            octopro_module_1.OctoproModule,
            approval_module_1.ApprovalModule,
            user_module_1.UserModule,
            payroll_module_1.PayrollModule,
            general_module_1.GeneralModule,
            statutory_report_module_1.StatutoryReportModule,
            azure_sso_module_1.AzureSSOModule,
            e_sign_module_1.ESignModule,
            user_legal_agreement_module_1.UserLegalAgreement,
            translate_1.TranslateModule,
            time_tracker_module_1.TimeTrackerModule,
            health_module_1.HealthModule,
            slack_module_1.SlackModule,
            leave_module_api_log_module_1.LeaveModuleApiLogModule,
        ],
        providers: [
            { provide: core_1.APP_FILTER, useClass: global_exception_filter_1.GlobalFilter },
            { provide: core_1.APP_INTERCEPTOR, useClass: interceptors_1.LoggingInterceptor },
        ],
    }),
    __param(0, (0, app_config_1.InjectAppConfig)()),
    __metadata("design:paramtypes", [Object, slack_service_1.SlackService])
], AppModule);
//# sourceMappingURL=app.module.js.map