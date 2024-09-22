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
exports.EmployeeMappingService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const employee_mapping_entity_1 = require("../../../../core/database/entities/employee-mapping.entity");
const services_1 = require("../../../../core/database/services");
const moment = require("moment");
let EmployeeMappingService = class EmployeeMappingService extends services_1.TypeOrmBaseService {
    constructor(employeeMappingRepository) {
        super(employeeMappingRepository);
        this.employeeMappingRepository = employeeMappingRepository;
    }
    async createManyEmployeeMappings(employeeMappings) {
        const entities = employeeMappings.map(employeeMapping => {
            const entity = this.employeeMappingRepository.create();
            entity.userEmail = employeeMapping.userEmail;
            entity.employeeId = employeeMapping.employeeId;
            entity.timeTrackerEmployeeId = employeeMapping.timeTrackerEmployeeId;
            entity.companyId = employeeMapping.companyId;
            entity.createdBy = 'system_generated@hrforte.com';
            return entity;
        });
        return this.employeeMappingRepository.save(entities);
    }
    async getManyEmployeeMappingByTTIds({ ttEmployeeIds, companyId, }) {
        if (ttEmployeeIds.length === 0) {
            return [];
        }
        const employeeMappings = await this.employeeMappingRepository.find({
            where: {
                timeTrackerEmployeeId: (0, typeorm_2.In)(ttEmployeeIds),
                companyId,
                isDeleted: false,
            },
        });
        return employeeMappings;
    }
    async getManyEmployeeMapping({ companyId, userEmails, }) {
        const employeeMappings = await this.employeeMappingRepository.find({
            where: {
                companyId,
                userEmail: (0, typeorm_2.In)(userEmails),
                isDeleted: false,
            },
            select: ['userEmail', 'timeTrackerEmployeeId', 'companyId', 'employeeId'],
        });
        return employeeMappings;
    }
    async getManyEmployeeMappingByIds({ companyId, employeeIds, }) {
        if (employeeIds.length === 0) {
            return [];
        }
        const employeeMappings = await this.employeeMappingRepository.find({
            where: {
                companyId,
                employeeId: (0, typeorm_2.In)(employeeIds),
                isDeleted: false,
            },
            select: ['userEmail', 'timeTrackerEmployeeId', 'companyId', 'employeeId'],
        });
        return employeeMappings;
    }
    async deleteManyEmployeeMapping({ companyId, timeTrackerIds, }) {
        if (timeTrackerIds.length === 0) {
            return [];
        }
        const employeeMappings = await this.employeeMappingRepository.update({
            companyId,
            timeTrackerEmployeeId: (0, typeorm_2.In)(timeTrackerIds),
            isDeleted: false,
        }, { isDeleted: true });
        return employeeMappings;
    }
    async getEmployeeMappingByEmail(userEmail, companyId) {
        return this.employeeMappingRepository.findOne({
            where: { userEmail, companyId, isDeleted: false },
            select: {
                userEmail: true,
                timeTrackerEmployeeId: true,
                employeeId: true,
            },
        });
    }
    async deleteLinkedTtData(companyId) {
        const employees = await this.employeeMappingRepository.find({
            where: {
                companyId: companyId,
                isDeleted: false,
            },
        });
        await Promise.all([
            employees.map(emp => {
                return this.employeeMappingRepository.update(emp.id, {
                    isDeleted: true,
                    updatedOn: moment.utc().toDate(),
                });
            }),
        ]);
    }
};
exports.EmployeeMappingService = EmployeeMappingService;
exports.EmployeeMappingService = EmployeeMappingService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(employee_mapping_entity_1.EmployeeMappingEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], EmployeeMappingService);
//# sourceMappingURL=employee-mapping.service.js.map