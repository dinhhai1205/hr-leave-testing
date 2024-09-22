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
exports.TimeTrackerApiService = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const api_constant_1 = require("./constants/api.constant");
const api_url_constants_1 = require("./constants/api-url.constants");
const replace_url_params_util_1 = require("../../common/utils/replace-url-params.util");
const time_tracker_config_1 = require("../../../../config/time-tracker.config");
const core_1 = require("@nestjs/core");
let TimeTrackerApiService = class TimeTrackerApiService {
    constructor(httpService, timeTrackerConfig, req) {
        this.httpService = httpService;
        this.timeTrackerConfig = timeTrackerConfig;
        this.req = req;
        this.useMasterApiKey = false;
        this.id = '';
    }
    setRequestId(id) {
        this.id = id;
    }
    setCompanyApiKey(key) {
        this.companyApiKey = key;
    }
    setEmail(email) {
        this.employeeEmail = email;
    }
    setUseMasterApiKey(value) {
        this.useMasterApiKey = value;
    }
    async request(configs, options) {
        try {
            const { useMasterApiKey } = options || {};
            const { headers = {}, type, segments, ...restConfigs } = configs;
            if (useMasterApiKey || this.useMasterApiKey) {
                headers[api_constant_1.API_KEY_HEADER] = this.timeTrackerConfig.masterApiKey;
            }
            else {
                headers[api_constant_1.COMPANY_API_KEY_HEADER] = this.companyApiKey;
                headers[api_constant_1.EMPLOYEE_EMAIL_HEADER] = this.employeeEmail;
            }
            const urlConfig = type
                ? { ...api_url_constants_1.TIME_TRACKER_URL[type] }
                : { method: configs.method, url: configs.url };
            if (segments) {
                urlConfig.url = (0, replace_url_params_util_1.replaceUrlParams)(urlConfig.url, segments);
            }
            const requestConfig = {
                responseType: 'json',
                ...restConfigs,
                ...urlConfig,
                headers,
                baseURL: this.timeTrackerConfig.apiUrl,
            };
            console.log('requestConfig', requestConfig);
            return await (0, rxjs_1.lastValueFrom)(this.httpService.request(requestConfig));
        }
        catch (error) {
            if (error.response) {
                throw new common_1.HttpException(error.response.data || 'Unknown error occurred', error.response.status || common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
            else if (error.request) {
                throw new common_1.InternalServerErrorException('No response received');
            }
            else {
                throw new common_1.InternalServerErrorException(error.message);
            }
        }
    }
};
exports.TimeTrackerApiService = TimeTrackerApiService;
exports.TimeTrackerApiService = TimeTrackerApiService = __decorate([
    (0, common_1.Injectable)({ scope: common_1.Scope.REQUEST }),
    __param(1, (0, time_tracker_config_1.InjectTimeTrackerConfig)()),
    __param(2, (0, common_1.Inject)(core_1.REQUEST)),
    __metadata("design:paramtypes", [axios_1.HttpService, Object, Object])
], TimeTrackerApiService);
//# sourceMappingURL=api.service.js.map