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
exports.TimeTrackerSyncRemovalService = void 0;
const common_1 = require("@nestjs/common");
const break_rule_service_1 = require("../break-rule/break-rule.service");
const auto_deduction_service_1 = require("../auto-deduction/auto-deduction.service");
const day_schedule_service_1 = require("../day-schedule/day-schedule.service");
const work_schedule_1 = require("../work-schedule");
const employee_mapping_service_1 = require("../employee-mapping/employee-mapping.service");
const group_mapping_service_1 = require("../group-mapping/group-mapping.service");
const company_mapping_service_1 = require("../company-mapping/company-mapping.service");
const api_service_1 = require("../../libs/api/api.service");
let TimeTrackerSyncRemovalService = class TimeTrackerSyncRemovalService {
    constructor(breakRuleService, autoDeductionService, dayScheduleService, workScheduleService, ttEmployeeService, ttGroupService, ttCompanyService, apiService) {
        this.breakRuleService = breakRuleService;
        this.autoDeductionService = autoDeductionService;
        this.dayScheduleService = dayScheduleService;
        this.workScheduleService = workScheduleService;
        this.ttEmployeeService = ttEmployeeService;
        this.ttGroupService = ttGroupService;
        this.ttCompanyService = ttCompanyService;
        this.apiService = apiService;
    }
    async deleteLinkedTTData(companyId, ttCompanyId) {
        const timeTrackerCompany = await this.workScheduleService.getWorkScheduleIdByCompanyId(companyId);
        if (!timeTrackerCompany) {
            return;
        }
        const results = await Promise.allSettled(timeTrackerCompany.map(item => Promise.allSettled([
            this.breakRuleService.deleteLinkedTtByCompanyId(item.id, companyId),
            this.autoDeductionService.deleteLinkedTtByCompanyId(item.id, companyId),
            this.dayScheduleService.deleteLinkedTtByCompanyId(item.id, companyId),
            this.workScheduleService.deleteLinkedTtByCompanyId(item.id, companyId),
            this.ttEmployeeService.deleteLinkedTtData(companyId),
            this.ttGroupService.deleteLinkedTtData(companyId),
            this.ttCompanyService.deleteLinkedTtData(companyId),
        ])));
        results.forEach((companyResult, companyIndex) => {
            if (companyResult.status === 'fulfilled') {
                companyResult.value.forEach((operationResult, operationIndex) => {
                    if (operationResult.status === 'rejected') {
                        console.error(`Operation ${operationIndex} for company ${companyIndex} failed:`, operationResult.reason);
                    }
                });
            }
            else {
                console.error(`All operations for company ${companyIndex} failed:`, companyResult.reason);
            }
        });
        const { data } = await this.apiService.request({
            type: 'SYNC_REMOVAL_TT_COMPANY',
            segments: { companyId: ttCompanyId },
        }, {
            useMasterApiKey: true,
        });
        if (data) {
            return 'Delete linked data time tracker successfully';
        }
        return 'Failed to delete linked data time tracker';
    }
};
exports.TimeTrackerSyncRemovalService = TimeTrackerSyncRemovalService;
exports.TimeTrackerSyncRemovalService = TimeTrackerSyncRemovalService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [break_rule_service_1.BreakRuleService,
        auto_deduction_service_1.AutoDeductionService,
        day_schedule_service_1.DayScheduleService,
        work_schedule_1.WorkScheduleService,
        employee_mapping_service_1.EmployeeMappingService,
        group_mapping_service_1.GroupMappingService,
        company_mapping_service_1.CompanyMappingService,
        api_service_1.TimeTrackerApiService])
], TimeTrackerSyncRemovalService);
//# sourceMappingURL=time-tracker-sync-removal.service.js.map