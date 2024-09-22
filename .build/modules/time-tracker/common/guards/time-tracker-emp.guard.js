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
exports.TimeTrackerEmployeeInfoGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const company_mapping_service_1 = require("../../modules/company-mapping/company-mapping.service");
const time_tracker_data_constant_1 = require("../constants/time-tracker-data.constant");
const api_service_1 = require("../../libs/api/api.service");
const iam_1 = require("../../../../core/iam");
const employee_mapping_service_1 = require("../../modules/employee-mapping/employee-mapping.service");
const group_mapping_service_1 = require("../../modules/group-mapping/group-mapping.service");
const crypto = require("crypto");
let TimeTrackerEmployeeInfoGuard = class TimeTrackerEmployeeInfoGuard {
    constructor(reflector, companyMappingService, timeTrackerApiService, employeeMappingService, groupMappingService) {
        this.reflector = reflector;
        this.companyMappingService = companyMappingService;
        this.timeTrackerApiService = timeTrackerApiService;
        this.employeeMappingService = employeeMappingService;
        this.groupMappingService = groupMappingService;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const { companyId } = request.params || {};
        const { groupId } = request.params;
        const activeUser = request[iam_1.REQUEST_USER_KEY];
        const isAdmin = request.headers?.[time_tracker_data_constant_1.TIME_TRACKER_ADMIN_HEADER];
        console.log('request[REQUEST_USER_KEY]', request[iam_1.REQUEST_USER_KEY]);
        if (!activeUser) {
            throw new common_1.UnauthorizedException('User not found');
        }
        if (!companyId) {
            return true;
        }
        const data = await this.companyMappingService.getTimeTrackerCompanyByHrfCompanyId(+companyId);
        const employeeInfo = await this.employeeMappingService.getEmployeeMappingByEmail(activeUser.userEmail, +companyId);
        const group = await this.groupMappingService.getTimeTrackerGroupId(+companyId, groupId ? groupId : 0);
        if (!data) {
        }
        if (isAdmin && typeof isAdmin === 'string') {
            this.timeTrackerApiService.setUseMasterApiKey(JSON.parse(isAdmin.toLowerCase()));
        }
        const requestId = crypto.randomUUID();
        this.timeTrackerApiService.setCompanyApiKey(data?.apiKey || '');
        this.timeTrackerApiService.setEmail(activeUser.userEmail || '');
        this.timeTrackerApiService.setRequestId(requestId);
        const timeTrackerEmpInfo = {
            timeTrackerCompanyId: data?.timeTrackerCompanyId,
            timeTrackerEmployeeId: employeeInfo?.timeTrackerEmployeeId,
            userEmail: activeUser.userEmail,
            timeTrackerGroupId: group?.timeTrackerGroupId,
        };
        Object.assign(request, {
            [time_tracker_data_constant_1.TIME_TRACKER_DATA]: timeTrackerEmpInfo,
            requestId,
        });
        return true;
    }
};
exports.TimeTrackerEmployeeInfoGuard = TimeTrackerEmployeeInfoGuard;
exports.TimeTrackerEmployeeInfoGuard = TimeTrackerEmployeeInfoGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector,
        company_mapping_service_1.CompanyMappingService,
        api_service_1.TimeTrackerApiService,
        employee_mapping_service_1.EmployeeMappingService,
        group_mapping_service_1.GroupMappingService])
], TimeTrackerEmployeeInfoGuard);
//# sourceMappingURL=time-tracker-emp.guard.js.map