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
exports.PayrollReportController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const auth_info_decorator_1 = require("../../../../common/decorators/auth-info.decorator");
const set_authorize_decorator_1 = require("../../../../common/decorators/set-authorize.decorator");
const enums_1 = require("../../../../common/enums");
const authentication_1 = require("../../../../core/iam/authentication");
const decorators_1 = require("../../../../core/iam/decorators");
const enums_2 = require("../../../../core/iam/enums");
const get_report_reconciliation_detail_dto_1 = require("./dto/get-report-reconciliation-detail.dto");
const pagination_payroll_report_by_country_dto_1 = require("./dto/pagination-payroll-report-by-country.dto");
const pagination_payroll_report_dto_1 = require("./dto/pagination-payroll-report.dto");
const payroll_report_column_customize_dto_1 = require("./dto/payroll-report-column-customize.dto");
const total_categories_dto_1 = require("./dto/total-categories.dto");
const payroll_report_service_1 = require("./payroll-report.service");
let PayrollReportController = class PayrollReportController {
    constructor(payrollReportService) {
        this.payrollReportService = payrollReportService;
    }
    async getReportReviewAndApproval(companyId, query) {
        return this.payrollReportService.getReportReviewAndApproval({
            companyId,
            query,
        });
    }
    async getReportReviewAndApprovalByCountry(companyId, countryCode, query) {
        return this.payrollReportService.getReportReviewAndApproval({
            companyId,
            query: { ...query, country: countryCode },
        });
    }
    async getReportReconciliation(companyId, query) {
        return this.payrollReportService.getReportReconciliation({
            companyId,
            query,
        });
    }
    async getReportReviewAndApprovalDetail(companyId, payrollHeaderId, employeeId) {
        return this.payrollReportService.getReportReviewAndApprovalDetail({
            companyId,
            payrollHeaderId,
            employeeId,
        });
    }
    async getReportReconciliationDetail(companyId, payrollHeaderId, query) {
        return this.payrollReportService.getReportReconciliationDetail({
            companyId,
            currPayrollHeaderId: payrollHeaderId,
            ...query,
        });
    }
    async exportReportReviewAndApproval(companyId, query, response, authInfo, body) {
        return this.payrollReportService.exportPayrollReport('reviewAndApproval', { companyId, query, response, authInfo }, body);
    }
    async exportReportReviewAndApprovalByCountry(companyId, countryCode, query, response, authInfo, body) {
        return this.payrollReportService.exportPayrollReport('reviewAndApproval', {
            companyId,
            response,
            authInfo,
            query: { ...query, country: countryCode },
        }, body);
    }
    async exportReportReconciliation(companyId, query, response, authInfo, body) {
        return this.payrollReportService.exportPayrollReport('reconciliation', { companyId, query, response, authInfo }, body);
    }
    async getTotalCategoriesReview(companyId, payrollHeaderId, query) {
        return this.payrollReportService.getTotalCategoriesBy({
            dataMode: 'reviewAndApproval',
            companyId,
            payrollHeaderId,
            query,
        });
    }
    async getTotalCategoriesReconciliation(companyId, payrollHeaderId, query) {
        return this.payrollReportService.getTotalCategoriesBy({
            dataMode: 'reconciliation',
            companyId,
            payrollHeaderId,
            query,
        });
    }
    async batchDeleteAllOldPayrollReports() {
        return this.payrollReportService.batchDeleteAllOldPayrollReports();
    }
};
exports.PayrollReportController = PayrollReportController;
__decorate([
    (0, common_1.Get)(':companyId/review-and-approval'),
    (0, set_authorize_decorator_1.SetAuthorize)({ permission: enums_1.EPermissionActions.VIEW, roles: [enums_1.ERole.ADMIN] }),
    __param(0, (0, common_1.Param)('companyId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, pagination_payroll_report_dto_1.PaginationPayrollReportDto]),
    __metadata("design:returntype", Promise)
], PayrollReportController.prototype, "getReportReviewAndApproval", null);
__decorate([
    (0, common_1.Get)(':companyId/review-and-approval/:countryCode'),
    (0, set_authorize_decorator_1.SetAuthorize)({ permission: enums_1.EPermissionActions.VIEW, roles: [enums_1.ERole.ADMIN] }),
    __param(0, (0, common_1.Param)('companyId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('countryCode')),
    __param(2, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, pagination_payroll_report_by_country_dto_1.PaginationPayrollReportByCountryDto]),
    __metadata("design:returntype", Promise)
], PayrollReportController.prototype, "getReportReviewAndApprovalByCountry", null);
__decorate([
    (0, common_1.Get)(':companyId/reconciliation'),
    (0, set_authorize_decorator_1.SetAuthorize)({ permission: enums_1.EPermissionActions.VIEW, roles: [enums_1.ERole.ADMIN] }),
    __param(0, (0, common_1.Param)('companyId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, pagination_payroll_report_dto_1.PaginationPayrollReportDto]),
    __metadata("design:returntype", Promise)
], PayrollReportController.prototype, "getReportReconciliation", null);
__decorate([
    (0, common_1.Get)(':companyId/review-and-approval/:payrollHeaderId/detail/:employeeId'),
    (0, set_authorize_decorator_1.SetAuthorize)({ permission: enums_1.EPermissionActions.VIEW, roles: [enums_1.ERole.ADMIN] }),
    __param(0, (0, common_1.Param)('companyId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('payrollHeaderId', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Param)('employeeId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number]),
    __metadata("design:returntype", Promise)
], PayrollReportController.prototype, "getReportReviewAndApprovalDetail", null);
__decorate([
    (0, common_1.Get)(':companyId/reconciliation/:payrollHeaderId'),
    (0, set_authorize_decorator_1.SetAuthorize)({ permission: enums_1.EPermissionActions.VIEW, roles: [enums_1.ERole.ADMIN] }),
    __param(0, (0, common_1.Param)('companyId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('payrollHeaderId', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, get_report_reconciliation_detail_dto_1.GetReportReconciliationDetailDto]),
    __metadata("design:returntype", Promise)
], PayrollReportController.prototype, "getReportReconciliationDetail", null);
__decorate([
    (0, common_1.Post)(':companyId/review-and-approval/export'),
    (0, set_authorize_decorator_1.SetAuthorize)({ permission: enums_1.EPermissionActions.EXPORT, roles: [enums_1.ERole.ADMIN] }),
    __param(0, (0, common_1.Param)('companyId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, common_1.Res)()),
    __param(3, (0, auth_info_decorator_1.AuthInfo)()),
    __param(4, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, pagination_payroll_report_dto_1.PaginationPayrollReportDto, Object, Object, payroll_report_column_customize_dto_1.PayrollReportColumnCustomizeDto]),
    __metadata("design:returntype", Promise)
], PayrollReportController.prototype, "exportReportReviewAndApproval", null);
__decorate([
    (0, common_1.Post)(':companyId/review-and-approval/export/:countryCode'),
    (0, set_authorize_decorator_1.SetAuthorize)({ permission: enums_1.EPermissionActions.EXPORT, roles: [enums_1.ERole.ADMIN] }),
    __param(0, (0, common_1.Param)('companyId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('countryCode')),
    __param(2, (0, common_1.Query)()),
    __param(3, (0, common_1.Res)()),
    __param(4, (0, auth_info_decorator_1.AuthInfo)()),
    __param(5, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, pagination_payroll_report_by_country_dto_1.PaginationPayrollReportByCountryDto, Object, Object, payroll_report_column_customize_dto_1.PayrollReportColumnCustomizeDto]),
    __metadata("design:returntype", Promise)
], PayrollReportController.prototype, "exportReportReviewAndApprovalByCountry", null);
__decorate([
    (0, common_1.Post)(':companyId/reconciliation/export'),
    (0, set_authorize_decorator_1.SetAuthorize)({ permission: enums_1.EPermissionActions.EXPORT, roles: [enums_1.ERole.ADMIN] }),
    __param(0, (0, common_1.Param)('companyId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, common_1.Res)()),
    __param(3, (0, auth_info_decorator_1.AuthInfo)()),
    __param(4, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, pagination_payroll_report_dto_1.PaginationPayrollReportDto, Object, Object, payroll_report_column_customize_dto_1.PayrollReportColumnCustomizeDto]),
    __metadata("design:returntype", Promise)
], PayrollReportController.prototype, "exportReportReconciliation", null);
__decorate([
    (0, common_1.Get)(':companyId/review-and-approval/:payrollHeaderId/total-categories'),
    (0, set_authorize_decorator_1.SetAuthorize)({ permission: enums_1.EPermissionActions.VIEW, roles: [enums_1.ERole.ADMIN] }),
    __param(0, (0, common_1.Param)('companyId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('payrollHeaderId', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, total_categories_dto_1.TotalCategoriesDto]),
    __metadata("design:returntype", Promise)
], PayrollReportController.prototype, "getTotalCategoriesReview", null);
__decorate([
    (0, common_1.Get)(':companyId/reconciliation/:payrollHeaderId/total-categories'),
    (0, set_authorize_decorator_1.SetAuthorize)({ permission: enums_1.EPermissionActions.VIEW, roles: [enums_1.ERole.ADMIN] }),
    __param(0, (0, common_1.Param)('companyId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('payrollHeaderId', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, total_categories_dto_1.TotalCategoriesDto]),
    __metadata("design:returntype", Promise)
], PayrollReportController.prototype, "getTotalCategoriesReconciliation", null);
__decorate([
    (0, common_1.Delete)('old-payroll-reports'),
    (0, authentication_1.Auth)(enums_2.AuthType.ApiKey),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PayrollReportController.prototype, "batchDeleteAllOldPayrollReports", null);
exports.PayrollReportController = PayrollReportController = __decorate([
    (0, swagger_1.ApiTags)('payroll-report'),
    (0, common_1.Controller)('payroll-report'),
    (0, decorators_1.ModuleMode)(enums_1.EApiModuleMode.Payroll),
    __metadata("design:paramtypes", [payroll_report_service_1.PayrollReportService])
], PayrollReportController);
//# sourceMappingURL=payroll-report.controller.js.map