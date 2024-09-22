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
exports.HrforteNotificationService = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../../../../common/constants");
const config_1 = require("../../../../config");
const services_1 = require("../../services");
let HrforteNotificationService = class HrforteNotificationService {
    constructor(hrforteApiConfig, hrforteApiService) {
        this.hrforteApiConfig = hrforteApiConfig;
        this.hrforteApiService = hrforteApiService;
        this.apiPath = '/v1/api/FlowAPI';
        this.baseHeader = {
            'Content-Type': constants_1.CONTENT_TYPE.JSON,
            'x-api-key': this.hrforteApiConfig.apiKey,
        };
    }
    async sendBulk(companyId, inputs) {
        const { data, status } = await this.hrforteApiService.request({
            method: 'POST',
            url: `${this.apiPath}/${companyId}/send-flow-msg-bulk`,
            data: inputs,
            headers: this.baseHeader,
        });
        return { data, status };
    }
};
exports.HrforteNotificationService = HrforteNotificationService;
exports.HrforteNotificationService = HrforteNotificationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, config_1.InjectHrforteApiConfig)()),
    __metadata("design:paramtypes", [Object, services_1.HrforteApiService])
], HrforteNotificationService);
//# sourceMappingURL=hrforte-notification.service.js.map