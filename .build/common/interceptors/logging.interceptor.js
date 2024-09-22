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
var LoggingInterceptor_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggingInterceptor = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const app_config_1 = require("../../config/app.config");
const producers_1 = require("../../core/queue/producers");
const decorators_1 = require("../decorators");
const enums_1 = require("../enums");
const utils_1 = require("../utils");
const extract_data_from_req_util_1 = require("../utils/extract-data-from-req.util");
let LoggingInterceptor = LoggingInterceptor_1 = class LoggingInterceptor {
    constructor(appConfig, reflector, leaveModuleApiLogProducer) {
        this.appConfig = appConfig;
        this.reflector = reflector;
        this.leaveModuleApiLogProducer = leaveModuleApiLogProducer;
        this.logger = new common_1.Logger(LoggingInterceptor_1.name);
    }
    intercept(context, next) {
        const { nodeEnv } = this.appConfig;
        const httpAdapter = context.switchToHttp();
        const request = httpAdapter.getRequest();
        const response = httpAdapter.getResponse();
        const reqObj = (0, extract_data_from_req_util_1.extractDataFromReq)(request);
        return next.handle().pipe((0, operators_1.tap)({
            next: () => {
                const skipFlag = (0, utils_1.getDecoratorContext)({
                    reflector: this.reflector,
                    context,
                    key: decorators_1.SKIP_FLAG,
                });
                if (skipFlag && skipFlag.includes(enums_1.ESkipFlag.API_LOG)) {
                    return;
                }
                const { statusCode, statusMessage } = response;
                const startMs = request['startMs'];
                const apiLogObj = {
                    ...reqObj,
                    statusCode,
                    statusMessage,
                    timeMs: Date.now() - startMs,
                };
                if (nodeEnv !== enums_1.ENodeEnv.PRODUCTION && nodeEnv !== enums_1.ENodeEnv.STAGING) {
                    this.logger.log((0, extract_data_from_req_util_1.extractApiLogObj)(apiLogObj, {
                        statusCode: apiLogObj.statusCode,
                        statusMessage: apiLogObj.statusMessage,
                        timeMs: apiLogObj.timeMs,
                    }));
                    return;
                }
                return this.leaveModuleApiLogProducer.addCreateLeaveModuleApiLogJob(apiLogObj);
            },
            error: err => (0, rxjs_1.throwError)(() => err),
        }), (0, operators_1.catchError)(err => (0, rxjs_1.throwError)(() => err)));
    }
};
exports.LoggingInterceptor = LoggingInterceptor;
exports.LoggingInterceptor = LoggingInterceptor = LoggingInterceptor_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, app_config_1.InjectAppConfig)()),
    __metadata("design:paramtypes", [Object, core_1.Reflector,
        producers_1.LeaveModuleApiLogProducer])
], LoggingInterceptor);
//# sourceMappingURL=logging.interceptor.js.map