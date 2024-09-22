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
exports.TimeSheetService = void 0;
const common_1 = require("@nestjs/common");
const api_service_1 = require("../../../libs/api/api.service");
const employee_mapping_service_1 = require("../../employee-mapping/employee-mapping.service");
const group_mapping_service_1 = require("../../group-mapping/group-mapping.service");
const work_schedule_1 = require("../../work-schedule");
let TimeSheetService = class TimeSheetService {
    constructor(apiService, employeeMappingService, groupMappingService, workScheduleService) {
        this.apiService = apiService;
        this.employeeMappingService = employeeMappingService;
        this.groupMappingService = groupMappingService;
        this.workScheduleService = workScheduleService;
    }
    async getTimeSheetOfEmployee({ query, companyId, employeeId, options, }) {
        const employeeMapping = await this.employeeMappingService.getManyEmployeeMappingByIds({
            companyId,
            employeeIds: [employeeId],
        });
        const ttEmployeeId = employeeMapping[0].timeTrackerEmployeeId;
        const { data } = await this.apiService.request({
            type: 'GET_TIME_SHEETS_DETAIL',
            params: query,
            segments: {
                companyId: options.companyId,
                employeeId: ttEmployeeId,
            },
        });
        return data;
    }
    async getTimeSheetOverviewByCompanyId({ query, companyId, options, }) {
        const { data } = await this.apiService.request({
            type: 'GET_TIME_SHEETS_OVERVIEW',
            params: {
                ...query,
                groupIds: await this.groupMappingService.getGroupMappings(query.groupIds || [], companyId),
                employeeIds: await this.employeeMappingService.getManyEmployeeMappingByIds({
                    employeeIds: query.employeeIds || [],
                    companyId,
                }),
                workScheduleIds: await this.workScheduleService.mapIdsToUUIDs(query.workScheduleIds || []),
            },
            segments: {
                companyId: options.companyId,
            },
        });
        return data;
    }
};
exports.TimeSheetService = TimeSheetService;
exports.TimeSheetService = TimeSheetService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [api_service_1.TimeTrackerApiService,
        employee_mapping_service_1.EmployeeMappingService,
        group_mapping_service_1.GroupMappingService,
        work_schedule_1.WorkScheduleService])
], TimeSheetService);
//# sourceMappingURL=time-sheets.service.js.map