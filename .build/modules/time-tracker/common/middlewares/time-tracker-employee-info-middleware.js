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
exports.TimeTrackerEmployeeInfoMiddleware = void 0;
const common_1 = require("@nestjs/common");
const enums_1 = require("../../../../common/enums");
const api_service_1 = require("../../libs/api/api.service");
const company_mapping_service_1 = require("../../modules/company-mapping/company-mapping.service");
const time_tracker_data_constant_1 = require("../constants/time-tracker-data.constant");
const employee_mapping_service_1 = require("../../modules/employee-mapping/employee-mapping.service");
let TimeTrackerEmployeeInfoMiddleware = class TimeTrackerEmployeeInfoMiddleware {
    constructor(companyMappingService, timeTrackerApiService, employeeMappingService) {
        this.companyMappingService = companyMappingService;
        this.timeTrackerApiService = timeTrackerApiService;
        this.employeeMappingService = employeeMappingService;
    }
    async use(request, response, next) {
        const { companyId } = request.params || {};
        const activeUser = {
            userEmail: 'user1@gmail.com',
            isAdmin: true,
            userRanking: enums_1.EUserRanking.SILVER,
            utcOffset: 7,
        };
        if (!activeUser) {
            throw new common_1.UnauthorizedException('User not found');
        }
        if (!companyId) {
            next();
        }
        const data = await this.companyMappingService.getTimeTrackerCompanyByHrfCompanyId(+companyId);
        const employeeInfo = await this.employeeMappingService.getEmployeeMappingByEmail(activeUser.userEmail, +companyId);
        if (!employeeInfo) {
            next();
        }
        if (!data) {
            throw new common_1.HttpException('There is no company data', common_1.HttpStatus.BAD_REQUEST);
        }
        this.timeTrackerApiService.setCompanyApiKey(data?.apiKey || '');
        this.timeTrackerApiService.setEmail(activeUser.userEmail || '');
        const timeTrackerEmpInfo = {
            timeTrackerCompanyId: data.timeTrackerCompanyId,
            timeTrackerEmployeeId: employeeInfo?.timeTrackerEmployeeId || '',
            userEmail: activeUser.userEmail,
        };
        Object.assign(request, { [time_tracker_data_constant_1.TIME_TRACKER_DATA]: timeTrackerEmpInfo });
        next();
    }
};
exports.TimeTrackerEmployeeInfoMiddleware = TimeTrackerEmployeeInfoMiddleware;
exports.TimeTrackerEmployeeInfoMiddleware = TimeTrackerEmployeeInfoMiddleware = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [company_mapping_service_1.CompanyMappingService,
        api_service_1.TimeTrackerApiService,
        employee_mapping_service_1.EmployeeMappingService])
], TimeTrackerEmployeeInfoMiddleware);
//# sourceMappingURL=time-tracker-employee-info-middleware.js.map