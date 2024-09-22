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
exports.ZohoTokenService = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const config_1 = require("../../../../../config");
let ZohoTokenService = class ZohoTokenService {
    constructor(zohoConfig, httpService) {
        this.zohoConfig = zohoConfig;
        this.httpService = httpService;
        this.accessToken = '';
        this.expiresIn = 3600;
        this.pendingPromise = null;
        this.axiosInstance = this.httpService.axiosRef;
        this.accountUrl = this.zohoConfig.accountUrl;
    }
    isTokenExpired() {
        const currentTime = Math.floor(Date.now() / 1000);
        return currentTime >= this.expiresIn;
    }
    async refreshToken() {
        const response = await this.axiosInstance.request({
            method: 'POST',
            url: `${this.accountUrl}/oauth/v2/token`,
            params: {
                refresh_token: this.zohoConfig.refreshToken,
                client_id: this.zohoConfig.clientId,
                client_secret: this.zohoConfig.clientSecret,
                redirect_uri: `https%3A%2F%2Fsign.zoho.com`,
                grant_type: 'refresh_token',
            },
        });
        if (response.status === 200) {
            const { access_token, expires_in } = response.data;
            this.accessToken = access_token;
            this.expiresIn = Math.floor(Date.now() / 1000) + expires_in;
        }
        else {
            throw new Error('Failed to refresh access token');
        }
    }
    async synchronizedRefresh() {
        if (!this.pendingPromise) {
            this.pendingPromise = this.refreshToken();
            try {
                await this.pendingPromise;
            }
            finally {
                this.pendingPromise = null;
            }
        }
        else {
            await this.pendingPromise;
        }
    }
    async getAccessToken() {
        if (!this.accessToken || this.isTokenExpired()) {
            await this.synchronizedRefresh();
        }
        return this.accessToken;
    }
};
exports.ZohoTokenService = ZohoTokenService;
exports.ZohoTokenService = ZohoTokenService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, config_1.InjectZohoConfig)()),
    __metadata("design:paramtypes", [Object, axios_1.HttpService])
], ZohoTokenService);
//# sourceMappingURL=zoho-token.service.js.map