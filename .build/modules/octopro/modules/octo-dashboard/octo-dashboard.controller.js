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
exports.OctoDashboardController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const set_auth_type_decorator_1 = require("../../../../common/decorators/set-auth-type.decorator");
const enums_1 = require("../../../../common/enums");
const octo_dashboard_payroll_pay_categories_dto_1 = require("./dto/octo-dashboard-payroll-pay-categories.dto");
const octo_dashboard_workforce_query_dto_1 = require("./dto/octo-dashboard-workforce-query.dto");
const octo_dashboard_service_1 = require("./octo-dashboard.service");
let OctoDashboardController = class OctoDashboardController {
    constructor(octoDashboardService) {
        this.octoDashboardService = octoDashboardService;
    }
    async getHeaderDashboard(companyId) {
        return this.octoDashboardService.getHeaderDashboard(companyId);
    }
    async getPayrollPayCategoriesDashboard(companyId, query) {
        return this.octoDashboardService.getPayrollDashboard('normal', companyId, query);
    }
    async getWorkforceDashboard(companyId, query) {
        return this.octoDashboardService.getWorkforceDashboard(companyId, query);
    }
    async getPayrollAggregateDashboard(companyId, query) {
        return this.octoDashboardService.getPayrollDashboard('aggregate', companyId, query);
    }
    async getInsightSummaryDashboard(companyId, clientId) {
        return this.octoDashboardService.getInsightSummaryDashboard({
            companyId,
            clientId,
        });
    }
    async getInsightDashboard(companyId, clientId) {
        return this.octoDashboardService.getInsightDashboard({
            companyId,
            clientId,
        });
    }
    async getListCountryOctoDashboard(companyId) {
        return this.octoDashboardService.getListCountryOctoDashboard(companyId);
    }
};
exports.OctoDashboardController = OctoDashboardController;
__decorate([
    (0, common_1.Get)(':companyId/header'),
    __param(0, (0, common_1.Param)('companyId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], OctoDashboardController.prototype, "getHeaderDashboard", null);
__decorate([
    (0, common_1.Get)(':companyId/pay-categories'),
    __param(0, (0, common_1.Param)('companyId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, octo_dashboard_payroll_pay_categories_dto_1.OctoDashboardPayrollPayCategoriesDto]),
    __metadata("design:returntype", Promise)
], OctoDashboardController.prototype, "getPayrollPayCategoriesDashboard", null);
__decorate([
    (0, common_1.Get)(':companyId/workforce'),
    __param(0, (0, common_1.Param)('companyId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, octo_dashboard_workforce_query_dto_1.OctoDashboardWorkforceQueryDto]),
    __metadata("design:returntype", Promise)
], OctoDashboardController.prototype, "getWorkforceDashboard", null);
__decorate([
    (0, common_1.Get)(':companyId/aggregate-categories'),
    __param(0, (0, common_1.Param)('companyId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, octo_dashboard_payroll_pay_categories_dto_1.OctoDashboardPayrollPayCategoriesDto]),
    __metadata("design:returntype", Promise)
], OctoDashboardController.prototype, "getPayrollAggregateDashboard", null);
__decorate([
    (0, common_1.Get)(':companyId/insight/:clientId/summary'),
    __param(0, (0, common_1.Param)('companyId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('clientId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], OctoDashboardController.prototype, "getInsightSummaryDashboard", null);
__decorate([
    (0, common_1.Get)(':companyId/insight/:clientId'),
    __param(0, (0, common_1.Param)('companyId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('clientId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], OctoDashboardController.prototype, "getInsightDashboard", null);
__decorate([
    (0, common_1.Get)(':companyId/client-countries'),
    __param(0, (0, common_1.Param)('companyId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], OctoDashboardController.prototype, "getListCountryOctoDashboard", null);
exports.OctoDashboardController = OctoDashboardController = __decorate([
    (0, swagger_1.ApiTags)('octo-dashboard'),
    (0, common_1.Controller)('octo-dashboard'),
    (0, set_auth_type_decorator_1.AuthType)(enums_1.EAuthType.OCTOPRO),
    __metadata("design:paramtypes", [octo_dashboard_service_1.OctoDashboardService])
], OctoDashboardController);
//# sourceMappingURL=octo-dashboard.controller.js.map