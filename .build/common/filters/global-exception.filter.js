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
var GlobalFilter_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalFilter = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const app_config_1 = require("../../config/app.config");
const encryption_1 = require("../../core/encryption");
const producers_1 = require("../../core/queue/producers");
const slack_producer_1 = require("../../core/queue/producers/slack.producer");
const enums_1 = require("../enums");
const extract_data_from_req_util_1 = require("../utils/extract-data-from-req.util");
let GlobalFilter = GlobalFilter_1 = class GlobalFilter {
    constructor(appConfig, leaveModuleApiLogProducer, slackProducer, encryptionService) {
        this.appConfig = appConfig;
        this.leaveModuleApiLogProducer = leaveModuleApiLogProducer;
        this.slackProducer = slackProducer;
        this.encryptionService = encryptionService;
        this.logger = new common_1.Logger(GlobalFilter_1.name);
        this.slackChannels = {
            [`${enums_1.EAppType.HRFORTE}-${enums_1.ENodeEnv.STAGING}`]: 'hrforte-mia-zone',
            [`${enums_1.EAppType.HRFORTE}-${enums_1.ENodeEnv.PRODUCTION}`]: 'hrforte-eva-zone',
            [`${enums_1.EAppType.MAP_HRFORTE}-${enums_1.ENodeEnv.STAGING}`]: 'hrforte-map-stag-zone',
            [`${enums_1.EAppType.MAP_HRFORTE}-${enums_1.ENodeEnv.PRODUCTION}`]: 'hrforte-map-prod-zone',
        };
    }
    async catch(exception, host) {
        this.appConfig.nodeEnv === enums_1.ENodeEnv.LOCAL &&
            this.logger.error(typeof exception === 'string' ? exception : exception.message, exception.stack);
        const httpException = this.transformException(exception);
        const message = httpException.message;
        const statusCode = httpException.getStatus();
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const obj = (0, extract_data_from_req_util_1.extractDataFromReq)(request);
        const startMs = request['startMs'];
        const timeMs = Date.now() - startMs;
        const cause = httpException.cause;
        const files = this.getFileUploaded(request);
        const apiLogObj = {
            ...obj,
            statusCode,
            timeMs,
            statusMessage: message,
            cause: `${exception}`,
            files,
        };
        await Promise.all([
            this.leaveModuleApiLogProducer.addCreateLeaveModuleApiLogJob(apiLogObj),
            this.postSlackMessage(apiLogObj),
        ]);
        if (this.appConfig.nodeEnv === enums_1.ENodeEnv.LOCAL) {
            this.logger.error((0, extract_data_from_req_util_1.extractApiLogObj)(apiLogObj, {
                statusCode: apiLogObj.statusCode,
                statusMessage: apiLogObj.statusMessage,
                timeMs: apiLogObj.timeMs,
            }));
        }
        if (response.headersSent) {
            response.destroy();
            console.error('GlobalFilter', message);
            return;
        }
        response.status(statusCode).json({
            message,
            statusCode,
            path: request.url,
            cause: cause || message,
        });
    }
    transformException(exception) {
        let message = typeof exception === 'string'
            ? exception
            : exception?.message ||
                'An error occurred while processing your request. Please reload again.';
        const status = exception?.status ?? common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        const httpOptions = {};
        if (exception instanceof TypeError) {
            httpOptions.cause = `TypeError: ` + message;
            message = 'Type error occurred';
        }
        else if (exception instanceof typeorm_1.TypeORMError) {
            httpOptions.cause = `TypeORMError: ` + message;
            message = 'Database error occurred';
        }
        else if (exception?.response?.message &&
            Array.isArray(exception.response.message)) {
            const responseMessage = exception.response.message;
            if (Array.isArray(responseMessage)) {
                message = responseMessage.join(', ');
            }
            else {
                message = responseMessage;
            }
        }
        return new common_1.HttpException(message, status, httpOptions);
    }
    async postSlackMessage(apiLogObj) {
        if (apiLogObj.statusCode === common_1.HttpStatus.INTERNAL_SERVER_ERROR) {
            const channel = this.slackChannels[`${this.appConfig.appType}-${this.appConfig.nodeEnv}`];
            const { method, url, companyId, cause, timeMs, statusCode, currentContext, } = apiLogObj;
            const textMessage = '```\n' +
                JSON.stringify({
                    method,
                    url,
                    companyId,
                    cause,
                    timeMs,
                    statusCode,
                    currentContext,
                }) +
                '```\n';
            if (channel) {
                await this.slackProducer.addPostMessageJob({ channel, text: textMessage }, { removeOnFail: true, removeOnComplete: true, delay: 500 });
            }
        }
    }
    getFileUploaded(request) {
        const encryptedFileInfo = request.body;
        const filesUploaded = [];
        const file = request.file;
        const files = request.files;
        if (!file && !files?.length)
            return filesUploaded;
        try {
            if (file) {
                filesUploaded.push(this.encryptionService.decrypt(file, encryptedFileInfo));
            }
            if (files?.length) {
                for (let i = 0; i < files.length; i++) {
                    filesUploaded.push(this.encryptionService.decrypt(files[i], encryptedFileInfo));
                }
            }
        }
        catch (error) {
        }
        finally {
        }
        return filesUploaded;
    }
    extractStackTrace(exception) {
        const stacktrace = exception?.stack?.split('\n') || null;
        if (stacktrace && stacktrace.length > 1)
            return stacktrace[1].trim();
        return null;
    }
};
exports.GlobalFilter = GlobalFilter;
exports.GlobalFilter = GlobalFilter = GlobalFilter_1 = __decorate([
    (0, common_1.Catch)(),
    __param(0, (0, app_config_1.InjectAppConfig)()),
    __metadata("design:paramtypes", [Object, producers_1.LeaveModuleApiLogProducer,
        slack_producer_1.SlackProducer,
        encryption_1.EncryptionService])
], GlobalFilter);
//# sourceMappingURL=global-exception.filter.js.map