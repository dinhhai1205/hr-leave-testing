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
exports.TimeTrackerCompanyService = void 0;
const common_1 = require("@nestjs/common");
const api_service_1 = require("../../libs/api/api.service");
const company_1 = require("../../../general/modules/company");
const company_mapping_service_1 = require("../company-mapping/company-mapping.service");
const employee_service_1 = require("../employee/employee.service");
const work_schedule_1 = require("../work-schedule");
let TimeTrackerCompanyService = class TimeTrackerCompanyService {
    constructor(apiService, companyMappingService, companyService, ttEmployeeService, workScheduleService) {
        this.apiService = apiService;
        this.companyMappingService = companyMappingService;
        this.companyService = companyService;
        this.ttEmployeeService = ttEmployeeService;
        this.workScheduleService = workScheduleService;
    }
    async createCompanyService(payload, companyId) {
        const { body, file } = payload;
        const formData = new FormData();
        formData.append('file', new Blob([file.buffer], { type: file.mimetype }));
        formData.append('address', body.address);
        formData.append('country', body.country);
        formData.append('isOwner', JSON.stringify(body.isOwner));
        formData.append('name', body.name);
        formData.append('timeZone', body.timeZone);
        const { data: companyResponse } = await this.apiService.request({
            type: 'CREATE_COMPANY',
            data: formData,
        }, { useMasterApiKey: true });
        const { data: companyApiKey } = await this.apiService.request({
            type: 'CREATE_COMPANY_API_KEY',
            data: { companyId: String(companyResponse.id) },
            segments: { companyId: companyResponse.companyId },
        }, { useMasterApiKey: true });
        await this.companyMappingService.createManyCompanyMappings([
            {
                companyId,
                timeTrackerCompanyId: String(companyResponse.id),
                apiKey: companyApiKey.apiKey,
            },
        ]);
        return {
            company: companyResponse,
            apiKey: companyApiKey.apiKey,
        };
    }
    async createSyncCompanyService(companyId) {
        const isExisted = await this.companyMappingService.findCompanyMapping(companyId);
        if (isExisted) {
            throw new common_1.BadRequestException('This company is already exists');
        }
        const companyData = await this.companyService.getCompany(companyId);
        if (!companyData) {
            throw new common_1.BadRequestException('Company not found');
        }
        const defaultData = 'default';
        const formData = new FormData();
        formData.append('address', defaultData);
        formData.append('country', defaultData);
        formData.append('isOwner', JSON.stringify(false));
        formData.append('name', companyData.name);
        formData.append('timeZone', defaultData);
        const { data: companyResponse } = await this.apiService.request({
            type: 'CREATE_COMPANY',
            data: formData,
        }, { useMasterApiKey: true });
        if (!companyResponse?.workScheduleDefault) {
            throw new common_1.BadRequestException('Cannot create work schedule default');
        }
        if (companyResponse?.workScheduleDefault) {
            const { name, workArrangement, breakType, default: workScheduleDefaultBoolean, unitTime, weeklyHours, utcOffset, id: ttWorkScheduleIdDefault, excludeEarlyClockIn, autoDeductions, breaks, daySchedules, overtime, locations, } = companyResponse.workScheduleDefault;
            const workScheduleLeaveDefault = await this.workScheduleService.getWorkScheduleLeaveDefault(companyId);
            if (!workScheduleLeaveDefault) {
                const workScheduleDto = {
                    name,
                    workArrangement,
                    breakType,
                    default: workScheduleDefaultBoolean,
                    unitTime,
                    weeklyHours,
                    utcOffset,
                    ttWorkScheduleId: ttWorkScheduleIdDefault,
                    excludeEarlyClockIn,
                    autoDeductions,
                    breaks,
                    daySchedules,
                    overtime,
                    locations,
                    companyId: companyId,
                    userEmail: 'system_generated@hrforte.com',
                };
                const workScheduleDefault = await this.workScheduleService.createWorkSchedule(companyId, 'system_generated@hrforte.com', workScheduleDto);
                if (!workScheduleDefault) {
                    throw new common_1.BadRequestException('Cannot create work schedule!');
                }
            }
            else {
                await this.workScheduleService.updateTtIdForWorkScheduleLeaveDefault(workScheduleLeaveDefault.id, ttWorkScheduleIdDefault);
            }
        }
        const { data: companyApiKey } = await this.apiService.request({
            type: 'CREATE_COMPANY_API_KEY',
            data: { companyId: String(companyResponse.id) },
            segments: { companyId: companyResponse.companyId },
        }, { useMasterApiKey: true });
        await this.companyMappingService.createManyCompanyMappings([
            {
                companyId,
                timeTrackerCompanyId: String(companyResponse.id),
                apiKey: companyApiKey.apiKey,
            },
        ]);
        await this.ttEmployeeService.createAdmin(String(companyResponse.id));
        return {
            company: companyResponse,
            apiKey: companyApiKey.apiKey,
        };
    }
    async getCompanyById(options) {
        const { data } = await this.apiService.request({
            type: 'GET_COMPANY',
            segments: { companyId: options.companyId },
        });
        return data;
    }
    async updateCompany(payload, options) {
        const { body, file } = payload;
        const formData = new FormData();
        formData.append('file', new Blob([file.buffer], { type: file.mimetype }));
        formData.append('address', body.address);
        formData.append('country', body.country);
        formData.append('name', body.name);
        formData.append('timeZone', body.timeZone);
        const { data } = await this.apiService.request({
            type: 'UPDATE_COMPANY',
            data: formData,
            segments: { companyId: options.companyId },
        });
        return data;
    }
    async deleteCompany(options) {
        const { data } = await this.apiService.request({
            type: 'DELETE_COMPANY',
            segments: { companyId: options.companyId },
        });
        return data;
    }
    async getTtCompanyId(companyId) {
        return this.companyMappingService.getTimeTrackerCompanyByHrfCompanyId(companyId);
    }
    async isExistedCompanyMapping(companyId) {
        const companyMapping = await this.companyMappingService.findCompanyMapping(companyId);
        if (!companyMapping) {
            return { isCompanyTimeTracker: false };
        }
        else {
            if (!companyMapping.timeTrackerCompanyId) {
                return { isCompanyTimeTracker: false };
            }
            return { isCompanyTimeTracker: true };
        }
    }
};
exports.TimeTrackerCompanyService = TimeTrackerCompanyService;
exports.TimeTrackerCompanyService = TimeTrackerCompanyService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [api_service_1.TimeTrackerApiService,
        company_mapping_service_1.CompanyMappingService,
        company_1.CompanyService,
        employee_service_1.TimeTrackerEmployeeService,
        work_schedule_1.WorkScheduleService])
], TimeTrackerCompanyService);
//# sourceMappingURL=company.service.js.map