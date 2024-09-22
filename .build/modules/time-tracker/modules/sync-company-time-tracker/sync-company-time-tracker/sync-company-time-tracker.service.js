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
exports.SyncCompanyTimeTrackerService = void 0;
const common_1 = require("@nestjs/common");
const company_service_1 = require("../../company/company.service");
const employee_service_1 = require("../../employee/employee.service");
const group_service_1 = require("../../group/group.service");
const work_schedule_1 = require("../../work-schedule");
let SyncCompanyTimeTrackerService = class SyncCompanyTimeTrackerService {
    constructor(companyService, employeeService, groupService, workScheduleService) {
        this.companyService = companyService;
        this.employeeService = employeeService;
        this.groupService = groupService;
        this.workScheduleService = workScheduleService;
    }
    async syncTimeTrackerCompanyInfo(companyId) {
        const syncCompany = await this.companyService.createSyncCompanyService(companyId);
        if (syncCompany) {
            const { company } = syncCompany;
            const workSchedule = await this.workScheduleService.syncExistedWorkSchedule(companyId, String(company.id));
            const syncEmployee = await this.employeeService.createManyEmployees({ companyId: String(company.id) }, companyId);
            const syncGroup = await this.groupService.syncGroupsToTimeTracker(companyId, String(company.id));
            const syncExistedWorkScheduleWithAssigneesAndGroupAssignees = await this.workScheduleService.syncExistedWorkScheduleWithAssigneesAndGroupAssignees(companyId, String(company.id));
            const syncWSAssignments = await this.workScheduleService.syncAssignmentsToTimeTracker(companyId, String(company.id));
            return [
                syncCompany,
                workSchedule,
                syncEmployee,
                syncGroup,
                syncExistedWorkScheduleWithAssigneesAndGroupAssignees,
                syncWSAssignments,
            ];
        }
        else {
            throw new common_1.BadRequestException('Could not sync company Info');
        }
    }
};
exports.SyncCompanyTimeTrackerService = SyncCompanyTimeTrackerService;
exports.SyncCompanyTimeTrackerService = SyncCompanyTimeTrackerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [company_service_1.TimeTrackerCompanyService,
        employee_service_1.TimeTrackerEmployeeService,
        group_service_1.GroupService,
        work_schedule_1.WorkScheduleService])
], SyncCompanyTimeTrackerService);
//# sourceMappingURL=sync-company-time-tracker.service.js.map