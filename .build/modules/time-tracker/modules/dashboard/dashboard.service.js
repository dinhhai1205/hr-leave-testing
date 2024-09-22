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
exports.DashboardService = void 0;
const common_1 = require("@nestjs/common");
const api_service_1 = require("../../libs/api/api.service");
let DashboardService = class DashboardService {
    constructor(apiService) {
        this.apiService = apiService;
    }
    async trackerHourDashboardByCompany(args) {
        const { companyId, query } = args;
        const { data } = await this.apiService.request({
            type: 'GET_TRACKER_HOUR_DASHBOARD_BY_COMPANY',
            segments: { companyId: companyId },
            params: query,
        });
        return data;
    }
    async getProjectTimeTracked(args) {
        const { companyId, query } = args;
        const { data } = await this.apiService.request({
            type: 'GET_PROJECT_TIME_TRACKED',
            segments: { companyId: companyId },
            params: query,
        });
        return data;
    }
    async getActivityTimeTracked(args) {
        const { companyId, query } = args;
        const { data } = await this.apiService.request({
            type: 'GET_ACTIVITY_TIME_TRACKED',
            segments: { companyId: companyId },
            params: query,
        });
        return data;
    }
};
exports.DashboardService = DashboardService;
exports.DashboardService = DashboardService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [api_service_1.TimeTrackerApiService])
], DashboardService);
//# sourceMappingURL=dashboard.service.js.map