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
exports.HrforteApiService = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const utils_1 = require("../../../common/utils");
const config_1 = require("../../../config");
let HrforteApiService = class HrforteApiService {
    constructor(hrforteApiConfig, httpService) {
        this.hrforteApiConfig = hrforteApiConfig;
        this.httpService = httpService;
        this.baseRequestConfig = {
            responseType: 'json',
        };
        this.baseRequestConfig.baseURL = this.hrforteApiConfig.apiUrl;
    }
    async request(configs) {
        const requestConfig = {
            ...this.baseRequestConfig,
            ...configs,
        };
        try {
            return await (0, rxjs_1.lastValueFrom)(this.httpService.request({
                method: configs.method,
                ...requestConfig,
            }));
        }
        catch (error) {
            throw (0, utils_1.handleAxiosCommonError)(error, {
                messageKey: 'developerMessage',
                statusKey: 'status',
            });
        }
    }
    requestWithoutWaiting(configs) {
        const requestConfig = {
            ...this.baseRequestConfig,
            ...configs,
        };
        this.httpService
            .request({
            method: configs.method,
            ...requestConfig,
        })
            .subscribe();
    }
};
exports.HrforteApiService = HrforteApiService;
exports.HrforteApiService = HrforteApiService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, config_1.InjectHrforteApiConfig)()),
    __metadata("design:paramtypes", [Object, axios_1.HttpService])
], HrforteApiService);
//# sourceMappingURL=hrforte-api.service.js.map