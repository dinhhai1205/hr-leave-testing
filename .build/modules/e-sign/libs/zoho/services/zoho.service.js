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
exports.ZohoService = void 0;
const common_1 = require("@nestjs/common");
const moment = require("moment");
const constants_1 = require("../../../../../common/constants");
const config_1 = require("../../../../../config");
const zoho_api_service_1 = require("./zoho-api.service");
let ZohoService = class ZohoService {
    constructor(zohoConfig, apiService) {
        this.zohoConfig = zohoConfig;
        this.apiService = apiService;
        this.apiUrl = this.zohoConfig.apiUrl;
    }
    async createDocument(requestDataBody) {
        const { requests } = requestDataBody;
        const { files, documentId, companyId, fileMetaData } = requestDataBody;
        const formData = new FormData();
        formData.append('data', JSON.stringify({ requests }));
        for (let i = 0; i < files.length; i++) {
            const fileName = `${companyId}-${documentId}-${fileMetaData[i].id}_${fileMetaData[i].name}.pdf`;
            formData.append('file', new File([files[i]], fileName));
        }
        const { data } = await this.apiService.request({
            method: 'POST',
            url: `${this.apiUrl}/requests`,
            data: formData,
            headers: { 'Content-Type': constants_1.CONTENT_TYPE.FORM },
            responseType: 'json',
        });
        return data;
    }
    async submitDocument(requestId, submitZohoRequestBodyDto) {
        const formData = new FormData();
        formData.append('data', JSON.stringify({ requests: submitZohoRequestBodyDto }));
        const { data } = await this.apiService.request({
            method: 'POST',
            url: `${this.apiUrl}/requests/${requestId}/submit`,
            data: formData,
            headers: { 'Content-Type': constants_1.CONTENT_TYPE.FORM },
            responseType: 'json',
        });
        return data;
    }
    async downloadCompletionCertificate(requestId) {
        const { data } = await this.apiService.request({
            method: 'GET',
            url: `${this.apiUrl}/requests/${requestId}/completioncertificate`,
            responseType: 'arraybuffer',
        });
        return data;
    }
    async downloadDocumentFile(requestId) {
        const { data } = await this.apiService.request({
            method: 'GET',
            url: `${this.apiUrl}/requests/${requestId}/pdf`,
            responseType: 'arraybuffer',
        });
        return data;
    }
    async downloadParticularDocumentFile(requestId, zohoDocumentFileId) {
        const { data } = await this.apiService.request({
            method: 'GET',
            url: `${this.apiUrl}/requests/${requestId}/documents/${zohoDocumentFileId}/pdf`,
            responseType: 'arraybuffer',
        });
        return data;
    }
    async recallDocument(requestId) {
        const { data } = await this.apiService.request({
            method: 'POST',
            url: `${this.apiUrl}/requests/${requestId}/recall`,
            responseType: 'json',
        });
        return data;
    }
    async remindRecipients(requestId) {
        const { data } = await this.apiService.request({
            method: 'POST',
            url: `${this.apiUrl}/requests/${requestId}/remind`,
            responseType: 'json',
        });
        return data;
    }
    async extendDocument(requestId, extendedDateString) {
        const formData = new FormData();
        formData.append('expire_by', moment(extendedDateString).format('DD MMMM YYYY'));
        const { data } = await this.apiService.request({
            method: 'PUT',
            url: `${this.apiUrl}/requests/${requestId}/extend`,
            data: formData,
            responseType: 'json',
        });
        return data;
    }
};
exports.ZohoService = ZohoService;
exports.ZohoService = ZohoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, config_1.InjectZohoConfig)()),
    __metadata("design:paramtypes", [Object, zoho_api_service_1.ZohoApiService])
], ZohoService);
//# sourceMappingURL=zoho.service.js.map