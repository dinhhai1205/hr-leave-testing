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
exports.ZohoApiService = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const utils_1 = require("../../../../../common/utils");
const zoho_token_service_1 = require("./zoho-token.service");
let ZohoApiService = class ZohoApiService {
    constructor(tokenService, httpService) {
        this.tokenService = tokenService;
        this.httpService = httpService;
    }
    async request(configs) {
        const accessToken = await this.tokenService.getAccessToken();
        const headers = {
            ...configs.headers,
            Authorization: `Zoho-oauthtoken ${accessToken}`,
        };
        const requestConfig = {
            ...configs,
            headers,
        };
        try {
            return await (0, rxjs_1.lastValueFrom)(this.httpService.request({
                method: configs.method,
                url: configs.url,
                ...requestConfig,
            }));
        }
        catch (error) {
            if (error.response && error.response.status === 401) {
                await this.tokenService.synchronizedRefresh();
                const newAccessToken = await this.tokenService.getAccessToken();
                const newHeaders = {
                    ...configs.headers,
                    Authorization: `Zoho-oauthtoken ${newAccessToken}`,
                };
                const newRequestConfig = {
                    ...configs,
                    headers: newHeaders,
                };
                return (0, rxjs_1.lastValueFrom)(this.httpService.request({
                    method: configs.method,
                    url: configs.url,
                    ...newRequestConfig,
                }));
            }
            else {
                throw (0, utils_1.handleAxiosCommonError)(error, {
                    messageKey: 'message',
                    statusKey: 'status',
                });
            }
        }
    }
};
exports.ZohoApiService = ZohoApiService;
exports.ZohoApiService = ZohoApiService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [zoho_token_service_1.ZohoTokenService,
        axios_1.HttpService])
], ZohoApiService);
//# sourceMappingURL=zoho-api.service.js.map