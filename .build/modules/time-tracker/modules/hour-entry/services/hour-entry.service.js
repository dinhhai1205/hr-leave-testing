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
exports.HourEntryService = void 0;
const common_1 = require("@nestjs/common");
const api_service_1 = require("../../../libs/api/api.service");
const employee_mapping_service_1 = require("../../employee-mapping/employee-mapping.service");
let HourEntryService = class HourEntryService {
    constructor(apiService, employeeMappingService) {
        this.apiService = apiService;
        this.employeeMappingService = employeeMappingService;
    }
    async getHourEntry(companyId, ttCompanyId, getHourEntry, employeeId) {
        const employeeMapping = await this.employeeMappingService.getManyEmployeeMappingByIds({
            companyId,
            employeeIds: [employeeId],
        });
        const ttEmployeeId = employeeMapping[0].timeTrackerEmployeeId;
        const { data } = await this.apiService.request({
            type: 'GET_HOUR_ENTRY',
            segments: { companyId: ttCompanyId, employeeId: ttEmployeeId },
            params: getHourEntry,
        });
        return data;
    }
    async createHourEntry(companyId, ttCompanyId, createHourEntry) {
        const employeeMapping = await this.employeeMappingService.getManyEmployeeMappingByIds({
            companyId,
            employeeIds: [createHourEntry.employeeId],
        });
        const ttEmployeeId = employeeMapping[0].timeTrackerEmployeeId;
        const createDto = { ...createHourEntry, employeeId: ttEmployeeId };
        const { data } = await this.apiService.request({
            type: 'CREATE_HOUR_ENTRY',
            data: createDto,
            segments: { companyId: ttCompanyId },
        });
        return data;
    }
    async updateHourEntry(companyId, ttCompanyId, updateHourEntry, id) {
        const { data } = await this.apiService.request({
            type: 'UPDATE_HOUR_ENTRY',
            data: updateHourEntry,
            segments: { companyId: ttCompanyId, hourEntryId: id },
        });
        return data;
    }
    async deleteHourEntry(companyId, ttCompanyId, deleteHoursEntryDto, id) {
        const { data } = await this.apiService.request({
            type: 'DELETE_HOUR_ENTRY',
            data: deleteHoursEntryDto,
            segments: { companyId: ttCompanyId, hourEntryId: id },
        });
        return data;
    }
};
exports.HourEntryService = HourEntryService;
exports.HourEntryService = HourEntryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [api_service_1.TimeTrackerApiService,
        employee_mapping_service_1.EmployeeMappingService])
], HourEntryService);
//# sourceMappingURL=hour-entry.service.js.map